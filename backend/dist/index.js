import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { initDatabase, pool } from './config/db.js';
import { securityWaf } from './middleware/securityWaf.js';
import { requestLogger } from './middleware/requestLogger.js';
import { globalRateLimiter, submissionRateLimiter } from './middleware/rateLimiter.js';
import applyRouter from './routes/apply.js';
import demoRouter from './routes/demo.js';
import contactRouter from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';
import careersRouter from './routes/careers.js';
import securityRouter from './routes/security.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// 1. Minimum Baseline Security Headers (Helmet)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            imgSrc: ["'self'", 'data:', 'https:'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
            connectSrc: ["'self'", 'http://localhost:*', 'https://hardmanreed.com'],
        },
    },
    crossOriginEmbedderPolicy: false,
}));
// 2. CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:3000', 'https://hardmanreed.com'];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, docker internal)
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: Not allowed by Access-Control-Allow-Origin'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
}));
// 3. Low-Memory Body Parser (protect against memory exhaustion / buffer overflows)
app.use(express.json({
    limit: '100kb',
    verify: (req, _res, buf) => {
        req.rawBody = buf.toString('utf-8');
    },
}));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
// 4. Request Logging to PostgreSQL and stdout
app.use(requestLogger);
// 5. Global Rate Limiting
app.use(globalRateLimiter);
// 6. Security Threat Inspection / WAF (Detects SQLi, XSS, Path Traversal, Command Injection, etc.)
// If malicious, saves incident to PostgreSQL and terminates with 403 Forbidden
app.use(securityWaf);
// 7. Health & Monitoring Endpoints
app.use('/api/security', securityRouter);
app.get('/api/health', (req, res) => {
    res.redirect('/api/security/health');
});
// 8. Submission API Endpoints with velocity protection
app.use('/api/apply', submissionRateLimiter, applyRouter);
app.use('/api/demo', submissionRateLimiter, demoRouter);
app.use('/api/contact', submissionRateLimiter, contactRouter);
app.use('/api/newsletter', submissionRateLimiter, newsletterRouter);
app.use('/api/careers', submissionRateLimiter, careersRouter);
// 9. 404 Route Catch-all
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
    });
});
// 10. Global Error Boundary (Prevents stack trace leaks in production)
app.use((err, req, res, _next) => {
    console.error('[UNHANDLED SERVER ERROR]', err.message);
    res.status(500).json({
        success: false,
        error: 'A secure server error occurred. Please try again later.',
    });
});
// Server Initialization
const startServer = () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`=======================================================`);
            console.log(`🚀 Hardman & Reed Security API Server running on port ${PORT}`);
            console.log(`🛡️  WAF Active: Deep inspection for SQLi, XSS, Path Traversal, Scanners`);
            console.log(`💾 PostgreSQL Ingestion Ready for all submissions`);
            console.log(`⚡ Optimized for 1 vCPU / 2GB RAM containerized environments`);
            console.log(`=======================================================`);
            // Initialize DB schema asynchronously in background
            initDatabase().catch((err) => {
                console.error('[DB] Schema initialization error:', err.message);
            });
        });
        return server;
    }
    catch (err) {
        console.error('[FATAL SERVER ERROR]', err);
        process.exit(1);
    }
};
startServer();
// Graceful shutdown handling
const gracefulShutdown = async () => {
    console.log('\n[SERVER] Received termination signal. Closing connections gracefully...');
    try {
        await pool.end();
        console.log('[DB] PostgreSQL pool closed.');
        process.exit(0);
    }
    catch (err) {
        console.error('[SERVER] Error during shutdown:', err);
        process.exit(1);
    }
};
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
