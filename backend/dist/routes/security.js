import { Router } from 'express';
import { pool } from '../config/db.js';
const router = Router();
// Health check endpoint (used by Docker & Kubernetes)
router.get('/health', async (_req, res) => {
    let dbStatus = 'DISCONNECTED';
    try {
        const dbCheck = await pool.query('SELECT 1 as healthy');
        if (dbCheck.rows.length > 0)
            dbStatus = 'CONNECTED';
    }
    catch (err) {
        dbStatus = 'UNREACHABLE';
    }
    res.status(200).json({
        status: dbStatus === 'CONNECTED' ? 'UP' : 'DEGRADED',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        database: dbStatus,
        memory: {
            rssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
            heapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        },
    });
});
// High-level security audit metrics
router.get('/stats', async (_req, res) => {
    try {
        const totalRequestsRes = await pool.query('SELECT COUNT(*) FROM request_logs');
        const blockedRes = await pool.query('SELECT COUNT(*) FROM security_incidents WHERE blocked = true');
        const threatBreakdownRes = await pool.query(`
      SELECT threat_type, COUNT(*) as count 
      FROM security_incidents 
      GROUP BY threat_type 
      ORDER BY count DESC
    `);
        const recentBlockedRes = await pool.query(`
      SELECT incident_id, ip, method, path, threat_type, threat_details, created_at 
      FROM security_incidents 
      ORDER BY created_at DESC 
      LIMIT 10
    `);
        res.json({
            success: true,
            metrics: {
                totalRequestsLogged: parseInt(totalRequestsRes.rows[0].count, 10),
                maliciousThreatsBlocked: parseInt(blockedRes.rows[0].count, 10),
                threatBreakdown: threatBreakdownRes.rows,
                recentBlockedIncidents: recentBlockedRes.rows,
            },
        });
    }
    catch (err) {
        console.error('[SECURITY STATS ERROR]', err);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve security metrics.',
        });
    }
});
export default router;
