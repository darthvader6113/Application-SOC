import { Router } from 'express';
import { pool } from '../config/db.js';
import { sanitizeString, sanitizeEmail } from '../utils/sanitize.js';
const router = Router();
router.post('/', async (req, res) => {
    try {
        const { roleTitle, fullName, email, portfolio, coverNote } = req.body;
        if (!roleTitle || !fullName || !email) {
            res.status(400).json({
                success: false,
                error: 'Missing required application fields (roleTitle, fullName, email).',
            });
            return;
        }
        const cleanRole = sanitizeString(roleTitle, 255);
        const cleanName = sanitizeString(fullName, 255);
        const cleanEmail = sanitizeEmail(email);
        const cleanPortfolio = sanitizeString(portfolio || '', 500);
        const cleanNote = sanitizeString(coverNote || '', 5000);
        const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
            req.socket.remoteAddress ||
            'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';
        const result = await pool.query(`INSERT INTO career_applications 
       (role_title, full_name, email, portfolio, cover_note, status, ip, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, role_title, status, created_at`, [cleanRole, cleanName, cleanEmail, cleanPortfolio, cleanNote, 'RECEIVED', clientIp, userAgent]);
        const app = result.rows[0];
        console.log(`[CAREER APPLICATION] Ingested candidate application #${app.id} for "${cleanRole}" from ${cleanEmail}`);
        res.status(201).json({
            success: true,
            message: 'Application received. Talent team will review your profile within 48 hours.',
            applicationId: app.id,
            timestamp: app.created_at,
        });
    }
    catch (err) {
        console.error('[CAREER APPLICATION ERROR]', err);
        res.status(500).json({
            success: false,
            error: 'An internal error occurred while submitting your job application.',
        });
    }
});
export default router;
