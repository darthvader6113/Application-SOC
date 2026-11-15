import { pool } from '../config/db.js';
export const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
        req.socket.remoteAddress ||
        'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';
    res.on('finish', async () => {
        const duration = Date.now() - startTime;
        const statusCode = res.statusCode;
        const isMalicious = !!req.isMalicious || statusCode === 403;
        // Structured terminal / docker stdout log
        const statusIcon = statusCode < 400 ? '✅' : statusCode === 403 ? '🛑' : '⚠️';
        console.log(`[HTTP] ${statusIcon} ${req.method} ${req.originalUrl} | Status: ${statusCode} | ${duration}ms | IP: ${clientIp} | Malicious: ${isMalicious}`);
        // Filter out huge payloads to conserve DB storage in 2GB VPS
        let safeBody = null;
        if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
            const cloned = { ...req.body };
            if ('password' in cloned)
                cloned.password = '[REDACTED]';
            if ('creditCard' in cloned)
                cloned.creditCard = '[REDACTED]';
            safeBody = cloned;
        }
        try {
            await pool.query(`INSERT INTO request_logs 
         (ip, method, path, status_code, duration_ms, user_agent, query_params, body_payload, is_malicious) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
                clientIp,
                req.method,
                req.originalUrl,
                statusCode,
                duration,
                userAgent,
                Object.keys(req.query).length > 0 ? JSON.stringify(req.query) : null,
                safeBody ? JSON.stringify(safeBody) : null,
                isMalicious,
            ]);
        }
        catch (dbErr) {
            console.error('[REQUEST LOGGER] Failed to insert request log into PostgreSQL:', dbErr.message);
        }
    });
    next();
};
