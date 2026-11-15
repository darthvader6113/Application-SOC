import { Router, Request, Response } from 'express';
import { pool } from '../config/db.js';
import { sanitizeString, sanitizeEmail } from '../utils/sanitize.js';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        error: 'Missing required contact fields (name, email, subject, message).',
      });
      return;
    }

    const cleanName = sanitizeString(name, 255);
    const cleanEmail = sanitizeEmail(email);
    const cleanSubject = sanitizeString(subject, 255);
    const cleanMessage = sanitizeString(message, 5000);

    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const result = await pool.query(
      `INSERT INTO contact_inquiries 
       (name, email, subject, message, status, ip, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, subject, status, created_at`,
      [cleanName, cleanEmail, cleanSubject, cleanMessage, 'RECEIVED', clientIp, userAgent]
    );

    const inquiry = result.rows[0];

    console.log(`[CONTACT INQUIRY] Ingested inquiry #${inquiry.id} from ${cleanEmail}`);

    res.status(201).json({
      success: true,
      message: 'Message delivered to Hardman & Reed Credit Desk. Average response under 45 minutes.',
      inquiryId: inquiry.id,
      timestamp: inquiry.created_at,
    });
  } catch (err) {
    console.error('[CONTACT INQUIRY ERROR]', err);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while submitting your message.',
    });
  }
});

export default router;

