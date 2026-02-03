# Training API - Summary

## What Was Created

A fully functional Express/TypeScript REST API with **12 intentional security vulnerabilities** for training purposes.

## Files Created (21 total)

### Configuration (4)
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.json` - ESLint configuration (incomplete - missing security plugins)
- `.gitignore` - Git ignore rules

### Source Code (13)
```
src/
├── index.ts                 # Main server (ISSUE #8: CORS)
├── db/
│   ├── connection.ts        # Database (ISSUE #11: Hardcoded password)
│   ├── queries.ts           # Queries (ISSUE #5: No prepared statements)
│   └── seed.ts              # Seed data
├── routes/
│   ├── users.ts             # Users API (ISSUE #1: SQL Injection)
│   ├── auth.ts              # Auth API (ISSUE #2: JWT secret)
│   ├── files.ts             # Files API (ISSUE #6: Path traversal)
│   ├── admin.ts             # Admin API (ISSUE #9: No auth)
│   └── health.ts            # Health check (ISSUE #12: Version exposure)
├── middleware/
│   ├── auth.ts              # Auth middleware (ISSUE #3: No rate limit)
│   └── cors.ts              # CORS config (ISSUE #8: documented)
└── services/
    ├── email.ts             # Email service (ISSUE #4: SMTP creds)
    ├── payment.ts           # Payment service (ISSUE #7: Stripe key)
    └── logger.ts            # Logger (ISSUE #10: Sensitive data)
```

### Documentation (4)
- `README.md` - Main documentation with all 12 issues explained
- `SECURITY_AUDIT.md` - Checklist for finding and fixing issues
- `SUMMARY.md` - This file
- `.env.example` - Example environment variables (secure version)

## Security Issues Summary

| # | Severity | Issue | File | Fix Difficulty |
|---|----------|-------|------|----------------|
| 1 | CRITICAL | SQL Injection | `routes/users.ts` | Easy |
| 2 | CRITICAL | Hardcoded JWT Secret | `routes/auth.ts` | Easy |
| 4 | CRITICAL | Hardcoded SMTP Creds | `services/email.ts` | Easy |
| 6 | CRITICAL | Path Traversal | `routes/files.ts` | Easy |
| 7 | CRITICAL | Hardcoded Stripe Key | `services/payment.ts` | Easy |
| 3 | HIGH | No Rate Limiting | `middleware/auth.ts` | Medium |
| 9 | HIGH | No Auth/Authz | `routes/admin.ts` | Medium |
| 8 | MEDIUM | Insecure CORS | `index.ts` | Easy |
| 10 | MEDIUM | Logging Sensitive Data | `services/logger.ts` | Easy |
| 11 | MEDIUM | Hardcoded DB Password | `db/connection.ts` | Easy |
| 12 | LOW | Version Exposure | `routes/health.ts` | Easy |

## Quick Start

```bash
cd /Users/kostiantyn.vlasenko/Projects/claude-code-training/apps/api

# Install dependencies
pnpm install

# Seed database
pnpm db:seed

# Run dev server
pnpm dev

# Server runs on http://localhost:3001
```

## Test Exploits

```bash
# SQL Injection
curl "http://localhost:3001/api/users/1%20OR%201=1"

# Path Traversal
curl "http://localhost:3001/api/files/..%2F..%2Fetc%2Fpasswd"

# Admin Access (no auth)
curl http://localhost:3001/api/admin/users
```

## Learning Objectives

1. **Identify** security vulnerabilities through code review
2. **Exploit** vulnerabilities to understand impact
3. **Remediate** issues with secure coding practices
4. **Verify** fixes work correctly
5. **Understand** OWASP Top 10 risks

## Training Guard

```typescript
if (process.env.NODE_ENV === 'production') {
  console.error('ERROR: This is TRAINING code with intentional security bugs!');
  process.exit(1);
}
```

This prevents accidental deployment to production.

## Next Steps

1. Read `README.md` for detailed explanations
2. Use `SECURITY_AUDIT.md` to track progress
3. Try to exploit each vulnerability
4. Fix each issue one by one
5. Verify fixes work
6. Compare with secure patterns

## Resources

- All 12 issues documented in `README.md`
- Exploitation examples in `SECURITY_AUDIT.md`
- Secure environment variables in `.env.example`
- Comments in code mark each issue

## Notes

- All credentials are **FAKE** and prefixed with `FAKE_` or `DO_NOT_USE`
- SQLite database (no actual password needed - just demonstrating anti-pattern)
- No real external services called (SMTP, Stripe are mocked)
- TRAINING GUARD prevents production deployment

---

**Remember:** This code is intentionally insecure. Learn from it, but never use these patterns in production!
