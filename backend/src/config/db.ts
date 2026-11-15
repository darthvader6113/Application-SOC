import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Connection pool tuned for 1 vCPU / 2GB RAM environment
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'hardman_reed',
  max: 15, // Cap connections to conserve memory
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('[DB] Unexpected error on idle client:', err);
});

export const initDatabase = async (retries = 10, delay = 3000): Promise<void> => {
  while (retries > 0) {
    try {
      console.log(`[DB] Connecting to PostgreSQL... (${retries} attempts left)`);
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');

        // 1. Request Logs Table
        await client.query(`
          CREATE TABLE IF NOT EXISTS request_logs (
            id SERIAL PRIMARY KEY,
            ip VARCHAR(45) NOT NULL,
            method VARCHAR(10) NOT NULL,
            path TEXT NOT NULL,
            status_code INT NOT NULL,
            duration_ms INT NOT NULL,
            user_agent TEXT,
            query_params JSONB,
            body_payload JSONB,
            is_malicious BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_req_logs_created_at ON request_logs(created_at DESC);
          CREATE INDEX IF NOT EXISTS idx_req_logs_is_malicious ON request_logs(is_malicious);
        `);

        // 2. Security Incidents / Blocked Requests Table
        await client.query(`
          CREATE TABLE IF NOT EXISTS security_incidents (
            id SERIAL PRIMARY KEY,
            incident_id VARCHAR(64) UNIQUE NOT NULL,
            ip VARCHAR(45) NOT NULL,
            method VARCHAR(10) NOT NULL,
            path TEXT NOT NULL,
            threat_type VARCHAR(64) NOT NULL,
            threat_details TEXT NOT NULL,
            headers JSONB,
            payload JSONB,
            blocked BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_sec_incidents_ip ON security_incidents(ip);
          CREATE INDEX IF NOT EXISTS idx_sec_incidents_type ON security_incidents(threat_type);
          CREATE INDEX IF NOT EXISTS idx_sec_incidents_created_at ON security_incidents(created_at DESC);
        `);

        // 3. Loan Applications
        await client.query(`
          CREATE TABLE IF NOT EXISTS loan_applications (
            id SERIAL PRIMARY KEY,
            loan_type VARCHAR(100) NOT NULL,
            loan_amount NUMERIC NOT NULL,
            company_name VARCHAR(255) NOT NULL,
            annual_revenue VARCHAR(100) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            status VARCHAR(50) DEFAULT 'RECEIVED',
            ip VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_loan_apps_email ON loan_applications(email);
          CREATE INDEX IF NOT EXISTS idx_loan_apps_created_at ON loan_applications(created_at DESC);
        `);

        // 4. Demo Bookings
        await client.query(`
          CREATE TABLE IF NOT EXISTS demo_bookings (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            volume VARCHAR(100),
            status VARCHAR(50) DEFAULT 'PENDING',
            ip VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_demo_bookings_email ON demo_bookings(email);
        `);

        // 5. Contact Inquiries
        await client.query(`
          CREATE TABLE IF NOT EXISTS contact_inquiries (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            status VARCHAR(50) DEFAULT 'UNREAD',
            ip VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
        `);

        // 6. Newsletter Subscribers
        await client.query(`
          CREATE TABLE IF NOT EXISTS newsletter_subscribers (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            ip VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
        `);

        // 7. Career Applications
        await client.query(`
          CREATE TABLE IF NOT EXISTS career_applications (
            id SERIAL PRIMARY KEY,
            role_title VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            portfolio VARCHAR(500),
            cover_note TEXT,
            status VARCHAR(50) DEFAULT 'SUBMITTED',
            ip VARCHAR(45),
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          CREATE INDEX IF NOT EXISTS idx_career_apps_email ON career_applications(email);
        `);

        await client.query('COMMIT');
        console.log('[DB] PostgreSQL schema initialized successfully with all security & submission tables.');
        client.release();
        return;
      } catch (schemaErr) {
        await client.query('ROLLBACK');
        client.release();
        throw schemaErr;
      }
    } catch (err) {
      console.error(`[DB] Connection failed: ${(err as Error).message}`);
      retries -= 1;
      if (retries === 0) {
        console.error('[DB] Exhausted all connection retries. Continuing in degraded mode.');
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

