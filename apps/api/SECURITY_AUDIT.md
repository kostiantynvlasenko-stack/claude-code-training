# Security Audit Checklist

Use this checklist to verify you found all 12 intentional security issues.

## Issue Tracking

### CRITICAL (5 issues)

- [ ] **ISSUE #1: SQL Injection**
  - File: `src/routes/users.ts` (2 locations)
  - Line: `/:id` endpoint, `/search` endpoint
  - Attack vector: String concatenation in SQL queries
  - Fix: Use parameterized queries with `?` placeholders

- [ ] **ISSUE #2: Hardcoded JWT Secret**
  - File: `src/routes/auth.ts`
  - Line: `const JWT_SECRET = 'FAKE_JWT_SECRET...'`
  - Attack vector: Anyone can forge valid tokens
  - Fix: Use `process.env.JWT_SECRET`

- [ ] **ISSUE #4: Hardcoded SMTP Credentials**
  - File: `src/services/email.ts`
  - Line: `const SMTP_CONFIG = { ... password: '...' }`
  - Attack vector: Credentials exposed in source code
  - Fix: Use environment variables

- [ ] **ISSUE #6: Path Traversal**
  - File: `src/routes/files.ts`
  - Line: `path.join(UPLOADS_DIR, filename)`
  - Attack vector: `../../etc/passwd`, `../../.ssh/id_rsa`
  - Fix: `path.basename(filename)` to sanitize

- [ ] **ISSUE #7: Hardcoded Stripe Key**
  - File: `src/services/payment.ts`
  - Line: `const STRIPE_SECRET_KEY = 'sk_test...'`
  - Attack vector: Payment API access, financial fraud
  - Fix: Use `process.env.STRIPE_SECRET_KEY`

---

### HIGH (2 issues)

- [ ] **ISSUE #3: No Rate Limiting**
  - File: `src/middleware/auth.ts`
  - Line: Comment mentions missing `express-rate-limit`
  - Attack vector: Brute force login attempts
  - Fix: Add `express-rate-limit` middleware

- [ ] **ISSUE #9: No Authentication/Authorization**
  - File: `src/routes/admin.ts`
  - Line: All endpoints (GET `/users`, DELETE `/users/:id`)
  - Attack vector: Anyone can access admin functions
  - Fix: Add `authMiddleware` and role check

---

### MEDIUM (3 issues)

- [ ] **ISSUE #8: Insecure CORS**
  - File: `src/index.ts`
  - Line: `cors({ origin: '*' })`
  - Attack vector: Cross-origin attacks from any domain
  - Fix: Restrict to specific origin(s)

- [ ] **ISSUE #10: Logging Sensitive Data**
  - File: `src/services/logger.ts`
  - Line: `body: req.body`, `headers: req.headers`
  - Attack vector: Passwords/tokens in logs
  - Fix: Redact sensitive fields before logging

- [ ] **ISSUE #11: Hardcoded Database Password**
  - File: `src/db/connection.ts`
  - Line: `const DB_PASSWORD = 'FAKE_DB_PASSWORD...'`
  - Attack vector: Database credentials in source
  - Fix: Use `process.env.DB_PASSWORD`

---

### LOW (1 issue)

- [ ] **ISSUE #12: Exposing Dependency Versions**
  - File: `src/routes/health.ts`
  - Line: `dependencies: packageJson.dependencies`
  - Attack vector: Helps attackers find vulnerable packages
  - Fix: Don't expose internal versions

---

## Exploitation Scripts

### SQL Injection Test

```bash
# Test user endpoint
curl "http://localhost:3001/api/users/1%20OR%201=1"

# Test search endpoint
curl "http://localhost:3001/api/users/search?q=a'%20OR%201=1--"

# Expected: Returns all users instead of one
```

### Path Traversal Test

```bash
# Try to read /etc/passwd
curl "http://localhost:3001/api/files/..%2F..%2Fetc%2Fpasswd"

# Try to read source code
curl "http://localhost:3001/api/files/..%2Fsrc%2Findex.ts"

# Expected: File contents leaked
```

### Admin Bypass Test

```bash
# Access admin endpoint without authentication
curl http://localhost:3001/api/admin/users

# Delete user without authentication
curl -X DELETE http://localhost:3001/api/admin/users/2

# Expected: Success without any auth check
```

### CORS Exploit Test

```html
<!-- Create cors-test.html -->
<script>
fetch('http://localhost:3001/api/admin/users')
  .then(r => r.json())
  .then(console.log);
</script>

<!-- Open in browser from different origin -->
<!-- Expected: Request succeeds (should be blocked) -->
```

---

## Remediation Verification

After fixing each issue, verify the fix:

### Verify SQL Injection Fix

```bash
# Should return error or single user
curl "http://localhost:3001/api/users/1%20OR%201=1"
```

### Verify Path Traversal Fix

```bash
# Should return 404 or sanitized filename only
curl "http://localhost:3001/api/files/..%2F..%2Fetc%2Fpasswd"
```

### Verify Admin Protection

```bash
# Should return 401 Unauthorized
curl http://localhost:3001/api/admin/users

# Should succeed with valid admin token
curl -H "Authorization: Bearer <admin-token>" \
  http://localhost:3001/api/admin/users
```

### Verify Rate Limiting

```bash
# Run 10 login attempts
for i in {1..10}; do
  curl -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"wrong@example.com","password":"wrong"}'
done

# After 5 attempts, should return 429 Too Many Requests
```

---

## Severity Classification Guide

### CRITICAL
- Direct data breach (SQL injection, path traversal)
- Credential exposure (hardcoded secrets)
- Financial impact (payment keys)

### HIGH
- Authentication bypass
- Authorization failure
- Brute force vulnerability

### MEDIUM
- Information disclosure (logging)
- CORS misconfiguration
- Missing security headers

### LOW
- Version exposure
- Minor information leaks
- Non-exploitable issues

---

## Score Card

Total issues: **12**

- CRITICAL: 5
- HIGH: 2
- MEDIUM: 3
- LOW: 1

**Passing grade:** Find and fix at least 10/12 issues (all CRITICAL and HIGH + most MEDIUM).

---

## Additional Challenges

Once you've fixed the 12 main issues, look for these bonus issues:

1. **Plain Text Passwords** - Passwords stored without hashing
2. **No Input Validation** - No checks on request body fields
3. **No HTTPS Enforcement** - No redirect from HTTP to HTTPS
4. **Missing Security Headers** - No Helmet.js or CSP
5. **No Request Size Limits** - Vulnerable to DoS via large payloads
6. **No XSS Protection** - Bio field allows `<script>` tags
7. **Weak Error Messages** - Stack traces exposed in production
8. **No CSRF Protection** - Missing CSRF tokens

---

## Secure Rewrite Checklist

For a production-ready version:

### Authentication & Authorization
- [ ] Hash passwords with bcrypt (cost factor ≥ 12)
- [ ] JWT secret from env vars (min 32 chars)
- [ ] Refresh tokens with rotation
- [ ] Role-based access control (RBAC)
- [ ] API key rotation policy

### Input Validation
- [ ] Schema validation (Zod, Joi, etc.)
- [ ] Parameterized SQL queries
- [ ] Path sanitization
- [ ] Request size limits (express.json({ limit: '1mb' }))
- [ ] Email format validation

### Security Headers
- [ ] Helmet.js installed
- [ ] HTTPS enforcement
- [ ] HSTS enabled
- [ ] CSP configured
- [ ] CORS whitelist only

### Monitoring & Logging
- [ ] Redact sensitive fields
- [ ] Log security events (failed logins, etc.)
- [ ] Rate limiting on all endpoints
- [ ] Request ID tracking
- [ ] Error tracking (Sentry, etc.)

### Dependencies
- [ ] Regular `npm audit` checks
- [ ] Dependabot alerts enabled
- [ ] Lock file committed
- [ ] Minimal dependencies

### Deployment
- [ ] All secrets in vault/env
- [ ] Production guard disabled
- [ ] Database backups
- [ ] SSL/TLS certificates
- [ ] Firewall rules

---

Good luck with the security audit!
