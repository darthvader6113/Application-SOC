# Hardman & Reed — Logging & Audit Infrastructure

This document provides a comprehensive guide on **how, where, and in what format** logs and security incidents are captured, stored, indexed, and inspected across the Hardman & Reed platform.

---

## 1. High-Level Logging Architecture

The platform implements a **dual-tier logging strategy** designed for low-overhead containerized environments (2GB RAM / 1 vCPU):

```
                       Incoming HTTP Traffic
                                │
                                ▼
                   ┌─────────────────────────┐
                   │  Nginx Reverse Proxy    │ ───► Container stdout (HTTP access log)
                   └────────────┬────────────┘
                                │
                                ▼
                   ┌─────────────────────────┐
                   │  Node.js API + WAF      │
                   └──────┬───────────┬──────┘
                          │           │
     Async DB Ingestion   │           │ Real-time Stream
                          ▼           ▼
        ┌───────────────────┐       ┌────────────────────────┐
        │ PostgreSQL DB     │       │ Container stdout       │
        │ • request_logs    │       │ (docker logs           │
        │ • security_incidents      │  hardman_reed_api)     │
        │ • submission logs │       └────────────────────────┘
        └───────────────────┘
```

1. **Tier 1 — Real-Time Streaming (`stdout`)**:
   Every request and threat is streamed to stdout in formatted, human-readable lines for real-time monitoring via Docker and terminal logs.
2. **Tier 2 — Persistent Structured SQL (`PostgreSQL`)**:
   Every request and threat is persisted asynchronously into dedicated PostgreSQL tables (`request_logs` and `security_incidents`) with JSONB fields, indexing, and non-blocking writes that preserve low API latency.

---

## 2. Where Logs are Stored

### Storage Location 1: PostgreSQL Database Tables

All persistent logs reside inside the `hardman_reed` database on the PostgreSQL container:

| Table Name | Primary Purpose | Retention / Volume |
| :--- | :--- | :--- |
| **`request_logs`** | Complete audit trail of every HTTP request (clean, rejected, or malicious). | High volume; indexed by `created_at` and `is_malicious`. |
| **`security_incidents`** | Dedicated threat registry for all blocked malicious requests (SQLi, XSS, Path Traversal, Scanners, etc.). | Security audits, forensic investigation, incident tracking. |
| **`loan_applications`** | Audit trail of SMB loan applications with IP, user-agent, and status. | Long-term business records. |
| **`demo_bookings`** | Audit log of platform walkthrough demo requests with requester metadata. | CRM & institutional pipeline. |
| **`contact_inquiries`** | Credit desk inquiries with IP and user-agent stamps. | Operational records. |
| **`newsletter_subscribers`** | Credit intelligence subscriber list with subscription timestamp and IP. | Marketing compliance. |
| **`career_applications`** | Talent submissions and candidate application metadata. | HR & hiring records. |

---

### Storage Location 2: Docker Container Stdout / Stderr

If PostgreSQL is ever undergoing maintenance or restarting, real-time logs continue streaming to the Docker logging driver:

- **Host Path**: `/var/lib/docker/containers/<container-id>/<container-id>-json.log`
- **Command Access**:
  - API Logs: `docker logs -f hardman_reed_api`
  - Database Logs: `docker logs -f hardman_reed_db`
  - Nginx Web Logs: `docker logs -f hardman_reed_frontend`

---

### Storage Location 3: PostgreSQL Data Volume on Host

PostgreSQL table data is persisted to a Docker named volume named `postgres_data`:
- **Physical Host Path**: `/var/lib/docker/volumes/hardman-reed_postgres_data/_data` (or `<project>_postgres_data`)
- This directory persists across container restarts, image rebuilds, and system reboots.

---

## 3. Database Schema Reference

### Table: `request_logs`
Records all incoming HTTP traffic through [`backend/src/middleware/requestLogger.ts`](file:///c:/Users/Sivasankar/Documents/Hardman%20&%20Reed/backend/src/middleware/requestLogger.ts).

```sql
CREATE TABLE request_logs (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) NOT NULL,               -- IPv4 or IPv6 client address
    method VARCHAR(10) NOT NULL,           -- GET, POST, OPTIONS, etc.
    path TEXT NOT NULL,                    -- Target path (e.g. /api/apply)
    status_code INT NOT NULL,              -- 200, 201, 400, 403, 404, 500
    duration_ms INT NOT NULL,              -- Execution latency in milliseconds
    user_agent TEXT,                       -- Client User-Agent string
    query_params JSONB,                    -- Parsed query parameters
    body_payload JSONB,                    -- Sanitized body payload (sensitive fields redacted)
    is_malicious BOOLEAN DEFAULT FALSE,    -- Flagged TRUE if blocked by WAF
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fast lookup indexes:
CREATE INDEX idx_req_logs_created_at ON request_logs(created_at DESC);
CREATE INDEX idx_req_logs_is_malicious ON request_logs(is_malicious);
```

---

### Table: `security_incidents`
Records all blocked threat attempts through [`backend/src/middleware/securityWaf.ts`](file:///c:/Users/Sivasankar/Documents/Hardman%20&%20Reed/backend/src/middleware/securityWaf.ts).

```sql
CREATE TABLE security_incidents (
    id SERIAL PRIMARY KEY,
    incident_id VARCHAR(64) UNIQUE NOT NULL, -- Unique ID (e.g. INC-1794750614299-D2JBT0)
    ip VARCHAR(45) NOT NULL,                 -- Attacker IP address
    method VARCHAR(10) NOT NULL,             -- HTTP method
    path TEXT NOT NULL,                      -- Target URL / endpoint
    threat_type VARCHAR(100) NOT NULL,       -- SQL_INJECTION, XSS_ATTACK, PATH_TRAVERSAL, etc.
    threat_details TEXT NOT NULL,            -- Exact rule and offending string fragment
    headers JSONB,                           -- Client request headers snapshot
    payload JSONB,                           -- Full raw payload & detected violations array
    blocked BOOLEAN DEFAULT TRUE,            -- Always TRUE (execution prevented)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Fast lookup indexes:
CREATE INDEX idx_security_incidents_threat_type ON security_incidents(threat_type);
CREATE INDEX idx_security_incidents_created_at ON security_incidents(created_at DESC);
```

---

## 4. Privacy, PII Masking & Storage Protection

To comply with data privacy standards and keep memory usage under control in a 2GB VPS:

1. **Automatic Credential Redaction**:
   Before writing to `request_logs`, sensitive keys are scrubbed automatically:
   - `password` ➔ `[REDACTED]`
   - `creditCard` ➔ `[REDACTED]`
   - `token` / `auth` ➔ `[REDACTED]`
2. **Payload Size Capping**:
   Express body parsers limit incoming payloads to `100kb` to prevent memory exhaustion / buffer bloat.
3. **Safe String Truncation**:
   Threat signatures inside `security_incidents` are truncated to 200 characters to prevent disk space exhaustion from large fuzzing payloads.

---

## 5. How to View and Query Logs

### Method 1: Using the Security API Endpoints

You can check live security statistics directly over HTTP without logging into PostgreSQL:

```bash
# Health check (includes uptime, DB connectivity & memory usage)
curl http://localhost:5000/api/security/health

# Threat statistics (total logged, blocked threats, threat breakdown, recent incidents)
curl http://localhost:5000/api/security/stats
```

Example response from `/api/security/stats`:
```json
{
  "success": true,
  "metrics": {
    "totalRequestsLogged": 425,
    "maliciousThreatsBlocked": 12,
    "threatBreakdown": [
      { "threat_type": "SQL_INJECTION", "count": "6" },
      { "threat_type": "MALICIOUS_SCANNER", "count": "4" },
      { "threat_type": "XSS_ATTACK", "count": "2" }
    ],
    "recentBlockedIncidents": [
      {
        "incident_id": "INC-1794750614299-D2JBT0",
        "ip": "203.0.113.19",
        "method": "POST",
        "path": "/api/apply",
        "threat_type": "SQL_INJECTION",
        "created_at": "2026-11-15T14:45:00.000Z"
      }
    ]
  }
}
```

---

### Method 2: Querying PostgreSQL via Docker

Open a `psql` shell inside the running database container:

```bash
docker exec -it hardman_reed_db psql -U postgres -d hardman_reed
```

#### Top Useful SQL Queries:

**1. View the 20 most recent requests:**
```sql
SELECT id, ip, method, path, status_code, duration_ms, is_malicious, created_at 
FROM request_logs 
ORDER BY created_at DESC 
LIMIT 20;
```

**2. View all blocked security threats:**
```sql
SELECT incident_id, ip, method, path, threat_type, threat_details, created_at 
FROM security_incidents 
ORDER BY created_at DESC;
```

**3. Inspect the full raw payload of a specific incident:**
```sql
SELECT incident_id, ip, threat_type, payload 
FROM security_incidents 
WHERE incident_id = 'INC-1794750614299-D2JBT0';
```

**4. Check traffic distribution by HTTP status code:**
```sql
SELECT status_code, COUNT(*) AS total_requests 
FROM request_logs 
GROUP BY status_code 
ORDER BY total_requests DESC;
```

**5. View slow requests (> 100ms latency):**
```sql
SELECT method, path, duration_ms, created_at 
FROM request_logs 
WHERE duration_ms > 100 
ORDER BY duration_ms DESC 
LIMIT 25;
```

**6. Count total submissions across business forms:**
```sql
SELECT 
  (SELECT COUNT(*) FROM loan_applications) AS loans,
  (SELECT COUNT(*) FROM demo_bookings) AS demos,
  (SELECT COUNT(*) FROM contact_inquiries) AS inquiries,
  (SELECT COUNT(*) FROM newsletter_subscribers) AS subscribers,
  (SELECT COUNT(*) FROM career_applications) AS careers;
```

---

### Method 3: Real-Time Terminal Streaming (Docker Logs)

View logs streaming in real-time as users browse and submit forms:

```bash
# Follow backend API logs (color-coded status, duration, IP, WAF alerts)
docker compose logs -f api

# Follow Nginx frontend traffic logs
docker compose logs -f frontend

# Follow PostgreSQL logs
docker compose logs -f db
```

Example output from `docker compose logs -f api`:
```text
[HTTP] ✅ GET /api/security/health | Status: 200 | 2ms | IP: 127.0.0.1 | Malicious: false
[HTTP] ✅ POST /api/apply | Status: 201 | 14ms | IP: 198.51.100.4 | Malicious: false
[LOAN APPLICATION] Successfully ingested application #104 for Northstar Logistics (officer@northstar.com)
[SECURITY WAF] 🛑 BLOCKED SQL_INJECTION attempt from 203.0.113.88 on POST /api/apply (Incident: INC-1794750614299-D2JBT0)
[HTTP] 🛑 POST /api/apply | Status: 403 | 5ms | IP: 203.0.113.88 | Malicious: true
```

---

## 6. Log Maintenance & Archiving for 2GB VPS

To prevent logs from consuming excessive disk space over months of operation:

### Run a Periodic Cleanup (Cron)
You can set up a weekly cron job on the Linux host to purge request logs older than 90 days while preserving security incidents:

```bash
# Delete general request logs older than 90 days (keeps malicious logs)
docker exec hardman_reed_db psql -U postgres -d hardman_reed -c \
  "DELETE FROM request_logs WHERE created_at < NOW() - INTERVAL '90 days' AND is_malicious = FALSE;"

# Reclaim database disk space
docker exec hardman_reed_db psql -U postgres -d hardman_reed -c "VACUUM ANALYZE request_logs;"
```

### Export / Backup Logs to a Compressed SQL File
```bash
docker exec hardman_reed_db pg_dump -U postgres -d hardman_reed \
  -t request_logs -t security_incidents | gzip > /home/svcadmin/security_logs_$(date +%F).sql.gz
```
