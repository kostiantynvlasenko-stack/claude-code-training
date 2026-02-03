# Security Issues Map

Quick reference for finding each of the 12 intentional vulnerabilities.

## Visual Map

```
src/
├── index.ts
│   └── ⚠️ ISSUE #8: CORS (line 19)
│
├── db/
│   ├── connection.ts
│   │   └── 🔴 ISSUE #11: Hardcoded DB password (line 5)
│   ├── queries.ts
│   │   └── 🔴 ISSUE #5: SQL string concatenation (line 4, 8)
│   └── seed.ts
│
├── routes/
│   ├── users.ts
│   │   └── 🔴 ISSUE #1: SQL Injection (line 7, 17)
│   ├── auth.ts
│   │   └── 🔴 ISSUE #2: Hardcoded JWT secret (line 8)
│   ├── files.ts
│   │   └── 🔴 ISSUE #6: Path traversal (line 16)
│   ├── admin.ts
│   │   └── 🔴 ISSUE #9: No authentication (line 6, 12)
│   └── health.ts
│       └── ⚠️ ISSUE #12: Version exposure (line 8)
│
├── middleware/
│   ├── auth.ts
│   │   └── 🔴 ISSUE #3: No rate limiting (line 3 comment)
│   └── cors.ts
│       └── ⚠️ ISSUE #8: Documentation only
│
└── services/
    ├── email.ts
    │   └── 🔴 ISSUE #4: Hardcoded SMTP creds (line 2-7)
    ├── payment.ts
    │   └── 🔴 ISSUE #7: Hardcoded Stripe key (line 2)
    └── logger.ts
        └── ⚠️ ISSUE #10: Logs sensitive data (line 4, 13)
```

## Color Key

- 🔴 **CRITICAL** - Direct security breach
- 🔴 **HIGH** - Authentication/authorization failure
- ⚠️ **MEDIUM** - Configuration/information disclosure
- ⚠️ **LOW** - Minor information leak

## Grep Commands

Find all issues quickly:

```bash
# Find all ISSUE comments
grep -rn "ISSUE #" src/

# Find hardcoded secrets
grep -rn "FAKE_" src/

# Find SQL string concatenation
grep -rn "\`SELECT.*\${" src/

# Find missing auth checks
grep -rn "TODO.*auth" src/
```

## Exploitation Order (Recommended)

Start with the easiest to exploit and most impactful:

1. **ISSUE #9** - Admin Access (no auth)
   - Just `curl http://localhost:3001/api/admin/users`

2. **ISSUE #1** - SQL Injection
   - `curl "http://localhost:3001/api/users/1%20OR%201=1"`

3. **ISSUE #6** - Path Traversal
   - `curl "http://localhost:3001/api/files/..%2F..%2Fetc%2Fpasswd"`

4. **ISSUE #2, #4, #7, #11** - Hardcoded Secrets
   - Just read the source code

5. **ISSUE #8** - CORS
   - Create HTML file with fetch() from different origin

6. **ISSUE #3** - Rate Limiting
   - Loop curl to brute force

7. **ISSUE #10** - Sensitive Logging
   - Check logs after login

8. **ISSUE #12** - Version Exposure
   - `curl http://localhost:3001/api/health`

## Fix Order (Recommended)

Fix in order of impact:

### Phase 1: Stop the Bleeding (CRITICAL)
1. Move all hardcoded secrets to `.env` (#2, #4, #7, #11)
2. Fix SQL injection with prepared statements (#1, #5)
3. Fix path traversal with `path.basename()` (#6)

### Phase 2: Lock the Doors (HIGH)
4. Add authentication to admin routes (#9)
5. Add rate limiting to auth endpoints (#3)

### Phase 3: Harden the Walls (MEDIUM)
6. Restrict CORS to specific origins (#8)
7. Redact sensitive data from logs (#10)

### Phase 4: Polish (LOW)
8. Remove version exposure from health check (#12)

## Testing Your Fixes

After each fix, run:

```bash
# SQL Injection (should fail)
curl "http://localhost:3001/api/users/1%20OR%201=1"

# Path Traversal (should fail)
curl "http://localhost:3001/api/files/..%2F..%2Fetc%2Fpasswd"

# Admin Access (should require auth)
curl http://localhost:3001/api/admin/users

# Health Check (should not expose versions)
curl http://localhost:3001/api/health
```

## OWASP Top 10 Mapping

| OWASP Category | Issues in This API |
|----------------|-------------------|
| A01: Broken Access Control | #9 (no auth/authz) |
| A02: Cryptographic Failures | #2, #4, #7, #11 (hardcoded secrets) |
| A03: Injection | #1, #5 (SQL injection) |
| A04: Insecure Design | #3 (no rate limit), #8 (CORS) |
| A05: Security Misconfiguration | #8 (CORS), #12 (version exposure) |
| A06: Vulnerable Components | #12 (exposed versions) |
| A07: Auth/Session Failures | #2 (weak JWT), #3 (no rate limit) |
| A08: Software/Data Integrity | #10 (logging sensitive data) |
| A09: Logging/Monitoring Failures | #10 (no redaction) |
| A10: SSRF | #6 (path traversal - similar concept) |

---

**Note:** This training API covers 9 out of 10 OWASP Top 10 categories!
