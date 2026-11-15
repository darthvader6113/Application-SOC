import { Router } from 'express';
import { pool } from '../config/db.js';
import { sanitizeString, sanitizeEmail, sanitizeNumber } from '../utils/sanitize.js';
const router = Router();
router.post('/', async (req, res) => {
    try {
        const { loanType, loanAmount, companyName, annualRevenue, fullName, email, phone, } = req.body;
        // Validate and sanitize inputs
        if (!loanType || !companyName || !fullName || !email) {
            res.status(400).json({
                success: false,
                error: 'Missing required application fields (loanType, companyName, fullName, email).',
            });
            return;
        }
        const cleanLoanType = sanitizeString(loanType, 100);
        const cleanAmount = sanitizeNumber(loanAmount, 1000, 25000000);
        const cleanCompany = sanitizeString(companyName, 255);
        const cleanRevenue = sanitizeString(annualRevenue || '$500K - $1M', 100);
        const cleanName = sanitizeString(fullName, 255);
        const cleanEmail = sanitizeEmail(email);
        const cleanPhone = sanitizeString(phone || '', 50);
        const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
            req.socket.remoteAddress ||
            'unknown';
        const userAgent = req.headers['user-agent'] || 'unknown';
        // Parameterized SQL query to prevent SQL Injection
        const result = await pool.query(`INSERT INTO loan_applications 
       (loan_type, loan_amount, company_name, annual_revenue, full_name, email, phone, status, ip, user_agent) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING id, loan_type, loan_amount, status, created_at`, [
            cleanLoanType,
            cleanAmount,
            cleanCompany,
            cleanRevenue,
            cleanName,
            cleanEmail,
            cleanPhone,
            'UNDERWRITING_PENDING',
            clientIp,
            userAgent,
        ]);
        const application = result.rows[0];
        console.log(`[LOAN APPLICATION] Successfully ingested application #${application.id} for ${cleanCompany} (${cleanEmail})`);
        res.status(201).json({
            success: true,
            message: 'Loan application submitted successfully. Instant underwriting in progress.',
            applicationId: application.id,
            status: application.status,
            timestamp: application.created_at,
        });
    }
    catch (err) {
        console.error('[LOAN APPLICATION ERROR]', err);
        res.status(500).json({
            success: false,
            error: 'An internal server error occurred while processing your loan application.',
        });
    }
});
export default router;
