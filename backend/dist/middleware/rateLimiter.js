import { persistSecurityIncident } from './securityWaf.js';
// In-memory sliding window counters (low memory footprint < 2MB)
const ipStore = new Map();
// Clean up expired entries every 2 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
        if (now > record.resetTime) {
            ipStore.delete(ip);
        }
    }
}, 120000);
export const createRateLimiter = (options) => {
    const { windowMs, maxRequests, message = 'Rate limit exceeded. Please try again later.' } = options;
    return async (req, res, next) => {
        const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
            req.socket.remoteAddress ||
            'unknown';
        const now = Date.now();
        const record = ipStore.get(clientIp);
        if (!record || now > record.resetTime) {
            ipStore.set(clientIp, {
                count: 1,
                resetTime: now + windowMs,
            });
            next();
            return;
        }
        record.count += 1;
        if (record.count > maxRequests) {
            req.isMalicious = true;
            const incidentId = `INC-RATELIMIT-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
            console.warn(`[RATE LIMIT] 🛑 Client ${clientIp} exceeded rate limit (${record.count}/${maxRequests}) on ${req.method} ${req.originalUrl}`);
            // Log threat incident to PostgreSQL
            await persistSecurityIncident({
                incidentId,
                ip: clientIp,
                method: req.method,
                path: req.originalUrl,
                threatType: 'RATE_LIMIT_EXCEEDED',
                threatDetails: `Exceeded threshold of ${maxRequests} requests within ${windowMs / 1000}s (Count: ${record.count})`,
                headers: req.headers,
                payload: { body: req.body, query: req.query },
            });
            res.status(429).json({
                success: false,
                error: message,
                retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
                incidentId,
            });
            return;
        }
        next();
    };
};
// Global rate limiter: 120 requests / min
export const globalRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 120,
    message: 'Too many requests from this IP address. Please slow down.',
});
// Strict submission rate limiter: 15 submissions / 5 min
export const submissionRateLimiter = createRateLimiter({
    windowMs: 5 * 60 * 1000,
    maxRequests: 15,
    message: 'Submission velocity limit reached. Please wait a few minutes before submitting another request.',
});
