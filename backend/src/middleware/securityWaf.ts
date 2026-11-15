import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db.js';

interface ThreatMatch {
  type: string;
  field: string;
  value: string;
  rule: string;
}

// Security Threat Signatures
const THREAT_PATTERNS = [
  {
    type: 'SQL_INJECTION',
    name: 'Union/Select Injection',
    regex: /\b(union\s+(all\s+)?select|select\s+.*\s+from|insert\s+into|delete\s+from|drop\s+table|alter\s+table|truncate\s+table)\b/i,
  },
  {
    type: 'SQL_INJECTION',
    name: 'Boolean/Tautology Injection',
    regex: /((\%27)|(\'))\s*(or|and)\s*(\d+|\w+)\s*=\s*(\d+|\w+)|((\%27)|(\'))\s*(or|and)\s*((\%27)|(\'))/i,
  },
  {
    type: 'SQL_INJECTION',
    name: 'Time-Based/Blind Injection',
    regex: /\b(pg_sleep\s*\(|sleep\s*\(|waitfor\s+delay|benchmark\s*\()/i,
  },
  {
    type: 'SQL_INJECTION',
    name: 'Comment/Termination Injection',
    regex: /(--|\/\*|\*\/|;\s*(drop|delete|insert|update))/i,
  },
  {
    type: 'XSS_ATTACK',
    name: 'Script Tag Injection',
    regex: /(<|%3C)\s*script[\s\S]*?(>|%3E)|(<\/script>|<\/script%3E)/i,
  },
  {
    type: 'XSS_ATTACK',
    name: 'Event Handler Injection',
    regex: /\b(onload|onerror|onclick|onmouseover|onfocus|onblur|onkeydown|onkeyup)\s*=/i,
  },
  {
    type: 'XSS_ATTACK',
    name: 'JavaScript/Data URI Execution',
    regex: /(javascript:|vbscript:|data:text\/html)/i,
  },
  {
    type: 'XSS_ATTACK',
    name: 'Malicious HTML Element',
    regex: /(<|%3C)\s*(iframe|object|embed|applet|meta|link|svg\s+onload)/i,
  },
  {
    type: 'PATH_TRAVERSAL',
    name: 'Directory Traversal Attempt',
    regex: /(\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e\/|\.\.%2f|%2e%2e%5c)/i,
  },
  {
    type: 'PATH_TRAVERSAL',
    name: 'System File Access Attempt',
    regex: /(\/etc\/passwd|\/etc\/shadow|\/proc\/self|c:\\windows\\system32|cmd\.exe)/i,
  },
  {
    type: 'COMMAND_INJECTION',
    name: 'OS Command Injection',
    regex: /(\||&|;|`|\$\()\s*(cat|ls|id|whoami|nc|bash|sh|curl|wget|powershell|cmd)\b/i,
  },
  {
    type: 'PROTOTYPE_POLLUTION',
    name: 'Object Prototype Poisoning',
    regex: /(__proto__|constructor\.prototype|prototype\.)/i,
  },
];

const SCANNER_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'dirbuster',
  'gobuster',
  'acunetix',
  'nmap',
  'masscan',
  'wpscan',
  'havij',
  'nessus',
  'metasploit',
];

// Helper to deep inspect any nested object or primitive
const inspectValues = (obj: unknown, prefix = ''): ThreatMatch[] => {
  const matches: ThreatMatch[] = [];
  if (!obj) return matches;

  if (typeof obj === 'string') {
    for (const pattern of THREAT_PATTERNS) {
      if (pattern.regex.test(obj)) {
        matches.push({
          type: pattern.type,
          field: prefix,
          value: obj.length > 200 ? obj.substring(0, 200) + '...' : obj,
          rule: pattern.name,
        });
        break;
      }
    }
  } else if (typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      // Check key itself for prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        matches.push({
          type: 'PROTOTYPE_POLLUTION',
          field: `${prefix}.${key}`,
          value: key,
          rule: 'Object Prototype Key Tampering',
        });
      }
      matches.push(...inspectValues(value, prefix ? `${prefix}.${key}` : key));
    }
  }

  return matches;
};

// Store security incident in PostgreSQL asynchronously
export const persistSecurityIncident = async (incident: {
  incidentId: string;
  ip: string;
  method: string;
  path: string;
  threatType: string;
  threatDetails: string;
  headers: Record<string, unknown>;
  payload: Record<string, unknown>;
}) => {
  try {
    await pool.query(
      `INSERT INTO security_incidents 
       (incident_id, ip, method, path, threat_type, threat_details, headers, payload, blocked) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        incident.incidentId,
        incident.ip,
        incident.method,
        incident.path,
        incident.threatType,
        incident.threatDetails,
        JSON.stringify(incident.headers),
        JSON.stringify(incident.payload),
        true,
      ]
    );
  } catch (err) {
    console.error('[SECURITY WAF] Failed to persist security incident to PostgreSQL:', err);
  }
};

export const securityWaf = async (
  req: Request & { isMalicious?: boolean },
  res: Response,
  next: NextFunction
): Promise<void> => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || '';

  // 1. Check User Agent for vulnerability scanners
  const matchedScanner = SCANNER_USER_AGENTS.find((scanner) =>
    userAgent.toLowerCase().includes(scanner)
  );

  if (matchedScanner) {
    const incidentId = `INC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    req.isMalicious = true;

    console.warn(`[SECURITY WAF] 🛑 BLOCKED Malicious Scanner (${matchedScanner}) from ${clientIp} on ${req.method} ${req.originalUrl}`);

    await persistSecurityIncident({
      incidentId,
      ip: clientIp,
      method: req.method,
      path: req.originalUrl,
      threatType: 'MALICIOUS_SCANNER',
      threatDetails: `Automated vulnerability scanner identified: ${matchedScanner}`,
      headers: req.headers,
      payload: { body: req.body, query: req.query },
    });

    res.status(403).json({
      success: false,
      error: 'Access Denied: Malicious scanning tool signature detected by Hardman & Reed WAF',
      threatType: 'MALICIOUS_SCANNER',
      incidentId,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // 2. Deep inspection of URL, Query params, and Request Body
  const threats: ThreatMatch[] = [];

  // Inspect URL / Path
  threats.push(...inspectValues(decodeURIComponent(req.originalUrl), 'url'));

  // Inspect Query Parameters
  threats.push(...inspectValues(req.query, 'query'));

  // Inspect Request Body
  threats.push(...inspectValues(req.body, 'body'));

  // Prototype Pollution check on raw incoming payload before engine deserialization
  const rawBodyText = (req as Request & { rawBody?: string }).rawBody || '';
  if (rawBodyText && /"(__proto__|constructor\.prototype|prototype)"/i.test(rawBodyText)) {
    threats.push({
      type: 'PROTOTYPE_POLLUTION',
      field: 'rawBody',
      value: rawBodyText.substring(0, 150),
      rule: 'Prototype Property Injection Detected',
    });
  }

  // 3. If any threat pattern matched: SAVE TO DB AND PREVENT IT
  if (threats.length > 0) {
    const primaryThreat = threats[0];
    const incidentId = `INC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    req.isMalicious = true;

    const threatSummary = threats
      .map((t) => `[${t.type}] Field '${t.field}': Rule '${t.rule}' matched pattern in '${t.value}'`)
      .join('; ');

    console.warn(
      `[SECURITY WAF] 🛑 BLOCKED ${primaryThreat.type} attempt from ${clientIp} on ${req.method} ${req.originalUrl} (Incident: ${incidentId})`
    );

    // Save malicious attempt to PostgreSQL
    await persistSecurityIncident({
      incidentId,
      ip: clientIp,
      method: req.method,
      path: req.originalUrl,
      threatType: primaryThreat.type,
      threatDetails: threatSummary,
      headers: req.headers,
      payload: {
        body: req.body,
        query: req.query,
        detectedViolations: threats,
      },
    });

    // PREVENT execution: Reject request with 403 Forbidden
    res.status(403).json({
      success: false,
      error: 'Security Policy Violation: Malicious payload pattern detected and blocked by Hardman & Reed WAF.',
      threatType: primaryThreat.type,
      incidentId,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Clean request: proceed to route handlers
  next();
};
