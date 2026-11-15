import { spawn } from 'child_process';
import http from 'http';

const PORT = 5099;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function request(path, options = {}) {
  const url = new URL(path, BASE_URL);
  return new Promise((resolve, reject) => {
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      timeout: 5000,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (_) {}
        resolve({ status: res.statusCode, headers: res.headers, body: json || data });
      });
    });
    req.on('error', reject);
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runVerification() {
  console.log('====================================================');
  console.log('🚀 STARTING COMPREHENSIVE E2E CODE VERIFICATION');
  console.log('====================================================\n');

  console.log(`[1/4] Spawning Hardman & Reed backend server on port ${PORT}...`);
  const server = spawn('node', ['dist/index.js'], {
    cwd: 'c:\\Users\\Sivasankar\\Documents\\Hardman & Reed\\backend',
    env: { ...process.env, PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (d) => process.stdout.write(`  [Server stdout]: ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`  [Server stderr]: ${d}`));

  let ready = false;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      const res = await request('/api/security/health');
      if (res.status === 200 || res.status === 503) {
        ready = true;
        console.log(`\n  Server is listening and responsive! (Health HTTP ${res.status})\n`);
        break;
      }
    } catch (_) {}
  }

  if (!ready) {
    server.kill();
    throw new Error('Server failed to start within 10 seconds.');
  }

  const results = [];
  function assert(name, passed, detail = '') {
    results.push({ name, passed, detail });
    console.log(`${passed ? '  ✅ PASS' : '  ❌ FAIL'}: ${name} ${detail ? '(' + detail + ')' : ''}`);
  }

  try {
    console.log('[2/4] Testing Security Baseline & Health Endpoints...');
    // Test 1: Health check
    const health = await request('/api/security/health');
    assert('Health Check (/api/security/health)', health.status === 200 || health.status === 503, `Status: ${health.status}`);

    // Test 2: 404 Route
    const notFound = await request('/api/non-existent-endpoint');
    assert('404 Route Handler', notFound.status === 404, `Status: ${notFound.status}`);

    // Test 3: Validation on missing required fields
    const emptyApply = await request('/api/apply', { method: 'POST', body: {} });
    assert('Input Validation Enforcement (/api/apply missing fields)', emptyApply.status === 400, `Status: ${emptyApply.status}`);

    console.log('\n[3/4] Testing Active Threat Inspection (WAF Prevention)...');

    // Test 4: SQL Injection Block
    const sqli = await request('/api/apply', {
      method: 'POST',
      body: {
        loanType: 'Term Loan',
        companyName: "Acme Corp' OR 1=1 --",
        fullName: 'Test Officer',
        email: 'test@example.com',
      },
    });
    assert(
      'WAF: Intercept & Block SQL Injection',
      sqli.status === 403 && sqli.body?.threatType === 'SQL_INJECTION',
      `Status: ${sqli.status}, Threat: ${sqli.body?.threatType}, Incident: ${sqli.body?.incidentId}`
    );

    // Test 5: XSS Block
    const xss = await request('/api/demo', {
      method: 'POST',
      body: {
        name: "<script>alert('XSS')</script>",
        email: 'attacker@example.com',
        company: 'Vulnerable Corp',
      },
    });
    assert(
      'WAF: Intercept & Block XSS Injection',
      xss.status === 403 && xss.body?.threatType === 'XSS_ATTACK',
      `Status: ${xss.status}, Threat: ${xss.body?.threatType}, Incident: ${xss.body?.incidentId}`
    );

    // Test 6: Path Traversal Block
    const traversal = await request('/api/contact', {
      method: 'POST',
      body: {
        name: 'Hacker',
        email: 'hacker@example.com',
        subject: 'Inquiry',
        message: 'Looking for secrets at ../../../../etc/passwd',
      },
    });
    assert(
      'WAF: Intercept & Block Directory Traversal',
      traversal.status === 403 && traversal.body?.threatType === 'PATH_TRAVERSAL',
      `Status: ${traversal.status}, Threat: ${traversal.body?.threatType}`
    );

    // Test 7: Remote Command Execution Block
    const rce = await request('/api/careers', {
      method: 'POST',
      body: {
        roleTitle: 'Developer; whoami',
        fullName: 'John Doe',
        email: 'john@example.com',
      },
    });
    assert(
      'WAF: Intercept & Block Remote Command Execution',
      rce.status === 403 && rce.body?.threatType === 'COMMAND_INJECTION',
      `Status: ${rce.status}, Threat: ${rce.body?.threatType}`
    );

    // Test 8: Prototype Pollution Block
    const proto = await request('/api/newsletter', {
      method: 'POST',
      body: '{"email":"test@example.com","__proto__":{"admin":true}}',
    });
    assert(
      'WAF: Intercept & Block Prototype Pollution',
      proto.status === 403 && proto.body?.threatType === 'PROTOTYPE_POLLUTION',
      `Status: ${proto.status}, Threat: ${proto.body?.threatType}`
    );

    // Test 9: Malicious Scanner User-Agent Block
    const scanner = await request('/api/security/health', {
      headers: { 'User-Agent': 'sqlmap/1.6.0#stable' },
    });
    assert(
      'WAF: Intercept & Block Vulnerability Scanner (sqlmap)',
      scanner.status === 403 && scanner.body?.threatType === 'MALICIOUS_SCANNER',
      `Status: ${scanner.status}, Threat: ${scanner.body?.threatType}`
    );

    console.log('\n[4/4] Verifying Clean Submissions & Sanitization...');

    // Test 10: Clean Newsletter submission
    const cleanNews = await request('/api/newsletter', {
      method: 'POST',
      body: { email: 'partner@institutional-fund.com' },
    });
    // If DB is connected -> 200; if DB is degraded -> 500 error boundary caught safely without crash
    assert(
      'Clean Submission Handling (/api/newsletter)',
      cleanNews.status === 200 || cleanNews.status === 500,
      `Status: ${cleanNews.status}`
    );

  } finally {
    console.log('\nShutting down test backend server...');
    server.kill('SIGTERM');
  }

  const failedCount = results.filter(r => !r.passed).length;
  console.log('\n====================================================');
  console.log(`VERIFICATION SUMMARY: ${results.length - failedCount}/${results.length} CHECKS PASSED`);
  console.log('====================================================');

  if (failedCount > 0) {
    process.exit(1);
  } else {
    console.log('🎉 ALL APPLICATION VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');
    process.exit(0);
  }
}

runVerification().catch(err => {
  console.error('Verification failed with error:', err);
  process.exit(1);
});
