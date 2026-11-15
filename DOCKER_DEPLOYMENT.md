# Hardman & Reed — Docker Deployment Guide (2GB RAM / 1 vCPU)

This deployment is engineered specifically for low-resource cloud environments (**2GB RAM, 1 vCPU**, e.g. AWS t4g.small / t3a.small, DigitalOcean $12 droplet, Hetzner CX22, Linode 2GB, or GCP e2-small).

---

## Architecture Overview

```
                      Internet (:80 / :443)
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │         Frontend Service (Nginx)             │
         │  • Serves React SPA build with Gzip caching  │
         │  • Proxies /api/ requests to Backend API     │
         │  • Memory ceiling: 128 MB (Actual: ~15 MB)   │
         └──────────────────────┬───────────────────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │         Security API Service (Node.js)       │
         │  • Hardman & Reed WAF Security Shield        │
         │  • Deep Inspection: SQLi, XSS, Path, Scanners│
         │  • Request Logging & Velocity Rate Limiter   │
         │  • Memory ceiling: 384 MB (Actual: ~45 MB)   │
         └──────────────────────┬───────────────────────┘
                                │
                                ▼
         ┌──────────────────────────────────────────────┐
         │         PostgreSQL Database (16-Alpine)      │
         │  • Tuned buffers (128MB shared, 4MB work)    │
         │  • Auto-initializes all tables & indexes     │
         │  • Memory ceiling: 512 MB (Actual: ~90 MB)   │
         └──────────────────────────────────────────────┘
```

**Total Combined Active Memory Footprint: ~150–200 MB**
Leaves **> 1.5 GB of free RAM** on your 2GB server to ensure zero Out-Of-Memory (OOM) crashes.

---

## Quick Start (1-Minute Deploy)

### 1. Clone & Configure Environment
```bash
cp .env.example .env
```
*(Optional)* Edit `.env` to customize your PostgreSQL password or port:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=hardman_reed
PORT=5000
NODE_ENV=production
```

### 2. Build & Launch in Docker
```bash
docker compose up -d --build
```

### 3. Verify Health & Running Services
```bash
docker compose ps
```
Output should show all 3 services in `healthy` / `running` state:
- `hardman_reed_db` (Port 5432)
- `hardman_reed_api` (Port 5000)
- `hardman_reed_frontend` (Port 80)

---

## Security Features & Malicious Request Prevention

### 1. Active Threat Detection (WAF)
Every HTTP request undergoes deep inspection before reaching any route handler:
- **SQL Injection (SQLi)**: Detects Boolean-based, Union-based, stacked queries, blind sleep (`pg_sleep`), and comment bypasses.
- **Cross-Site Scripting (XSS)**: Detects `<script>`, event handlers (`onerror=`, `onload=`), `javascript:` URIs, SVG injection, and malicious DOM objects.
- **Directory / Path Traversal**: Detects `../`, `..\`, `/etc/passwd`, Windows system paths, and encoded traversal attempts.
- **Command Injection (RCE)**: Detects shell execution tokens (`;`, `|`, `&&`, `$()`, backticks) paired with dangerous binaries.
- **Malicious Scanners**: Rejects automated scanning tools (`sqlmap`, `nikto`, `dirbuster`, `gobuster`, `acunetix`, `nmap`).
- **Prototype Pollution**: Detects `__proto__`, `constructor.prototype` tampering in JSON bodies.

### 2. "Save in DB and Prevent It"
When a malicious request is detected:
1. **Recorded to Database**: Immediately logged into the PostgreSQL `security_incidents` table with:
   - `incident_id`: Unique tracking ID (`INC-...`)
   - `threat_type`: Categorization (`SQL_INJECTION`, `XSS_ATTACK`, etc.)
   - `threat_details`: Exact field name and matched rule
   - `ip` & `headers`: Remote IP and client headers
   - `payload`: Full raw submitted payload
   - `blocked: true`
2. **Prevented Execution**: Rejects the request with `HTTP 403 Forbidden`:
   ```json
   {
     "success": false,
     "error": "Security Policy Violation: Malicious payload pattern detected and blocked by Hardman & Reed WAF.",
     "threatType": "SQL_INJECTION",
     "incidentId": "INC-1794750274279-5TPR9Z",
     "timestamp": "2026-11-15T13:44:34.279Z"
   }
   ```
3. The request **never touches** business tables or executes database mutations.

### 3. Comprehensive Request Logging
- Every clean and blocked request is persisted into `request_logs` in PostgreSQL:
  - `ip`, `method`, `path`, `status_code`, `duration_ms`, `user_agent`, `query_params`, `body_payload`, `is_malicious`.
- Structured output is also streamed to Docker logs (`docker logs -f hardman_reed_api`).

---

## PostgreSQL Database Schema (Auto-Created on Boot)

| Table | Purpose |
| :--- | :--- |
| `request_logs` | Logs every incoming HTTP request with timing, status, and payload |
| `security_incidents` | Stores all blocked malicious payloads and scanner attempts |
| `loan_applications` | Stores submissions from the Fast SMB Loan Application Modal |
| `demo_bookings` | Stores submissions from the Lending OS Platform Walkthrough Modal |
| `contact_inquiries` | Stores submissions from the Get in Touch form |
| `newsletter_subscribers` | Stores subscriptions from the SMB Credit Radar banner |
| `career_applications` | Stores job applications submitted from the Careers section |

---

## Useful Operational Commands

### View Live Logs
```bash
# View backend API logs (including WAF detections)
docker compose logs -f api

# View database logs
docker compose logs -f db

# View web server access logs
docker compose logs -f frontend
```

### Inspect Security Statistics via API
```bash
# Check system health & RAM usage
curl http://localhost:5000/api/security/health

# Check security statistics & recent blocked incidents
curl http://localhost:5000/api/security/stats
```

### Connect to PostgreSQL Shell Inside Docker
```bash
docker exec -it hardman_reed_db psql -U postgres -d hardman_reed

# Query recent security incidents
SELECT incident_id, ip, threat_type, created_at FROM security_incidents ORDER BY created_at DESC LIMIT 10;

# Query recent loan applications
SELECT id, company_name, loan_amount, loan_type, email, created_at FROM loan_applications ORDER BY created_at DESC;
```

### Stop / Restart Containers
```bash
# Stop all containers
docker compose down

# Stop and wipe database volume (clean state)
docker compose down -v
```

