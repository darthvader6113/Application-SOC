import { Router, Request, Response } from 'express';
import { pool } from '../config/db.js';
import { sanitizeString, sanitizeEmail } from '../utils/sanitize.js';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, company, volume } = req.body;

    if (!name || !email || !company) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields (name, email, company).',
      });
      return;
    }

    const cleanName = sanitizeString(name, 255);
    const cleanEmail = sanitizeEmail(email);
    const cleanCompany = sanitizeString(company, 255);
    const cleanVolume = sanitizeString(volume || '$500K - $1M / month', 100);

    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const result = await pool.query(
      `INSERT INTO demo_bookings 
       (name, email, company, volume, status, ip, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, name, company, status, created_at`,
      [cleanName, cleanEmail, cleanCompany, cleanVolume, 'PENDING_SCHEDULING', clientIp, userAgent]
    );

    const booking = result.rows[0];

    console.log(`[DEMO BOOKING] Booked demo #${booking.id} for ${cleanCompany} (${cleanEmail})`);

    res.status(201).json({
      success: true,
      message: 'Demo booking received. An institutional solutions engineer will connect shortly.',
      bookingId: booking.id,
      timestamp: booking.created_at,
    });
  } catch (err) {
    console.error('[DEMO BOOKING ERROR]', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while booking the platform demo.',
    });
  }
});

export default router;

