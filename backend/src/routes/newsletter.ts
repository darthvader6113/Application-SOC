import { Router, Request, Response } from 'express';
import { pool } from '../config/db.js';
import { sanitizeEmail } from '../utils/sanitize.js';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        error: 'Email address is required.',
      });
      return;
    }

    const cleanEmail = sanitizeEmail(email);
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Safe UPSERT (ignore duplicates quietly)
    const result = await pool.query(
      `INSERT INTO newsletter_subscribers (email, ip, user_agent)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email, created_at`,
      [cleanEmail, clientIp, userAgent]
    );

    const isNew = result.rows.length > 0;
    console.log(`[NEWSLETTER] ${isNew ? 'New subscriber' : 'Existing subscriber'}: ${cleanEmail}`);

    res.status(200).json({
      success: true,
      message: isNew
        ? 'Thank you for subscribing to Hardman & Reed credit market intelligence.'
        : 'You are already registered for weekly credit intelligence updates.',
    });
  } catch (err) {
    console.error('[NEWSLETTER ERROR]', err);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your subscription.',
    });
  }
});

export default router;

