# Training API - Complete File Index

**Created:** 2026-02-03  
**Purpose:** Security training with 12 intentional vulnerabilities  
**Tech Stack:** Express + TypeScript + SQLite + JWT

---

## 📁 Project Structure

```
apps/api/
├── 📄 Configuration (5 files)
│   ├── package.json          # Dependencies, scripts
│   ├── tsconfig.json          # TypeScript config
│   ├── .eslintrc.json         # Linter (incomplete)
│   ├── .gitignore             # Git exclusions
│   └── .env.example           # Secure env vars template
│
├── 📚 Documentation (5 files)
│   ├── README.md              # Main docs (all issues explained)
│   ├── SECURITY_AUDIT.md      # Find & fix checklist
│   ├── ISSUES_MAP.md          # Visual issue locations
│   ├── SUMMARY.md             # Quick overview
│   └── INDEX.md               # This file
│
├── 🛠️ Scripts (1 file)
│   └── test-setup.sh          # Verification script
│
├── 💾 Source Code (14 TypeScript files)
│   └── src/
│       ├── index.ts           # Main server
│       │   └── 🔴 ISSUE #8: CORS (line 19)
│       │
│       ├── db/
│       │   ├── connection.ts  # Database setup
│       │   │   └── 🔴 ISSUE #11: Hardcoded password (line 5)
│       │   ├── queries.ts     # DB queries
│       │   │   └── 🔴 ISSUE #5: String concat (line 4, 8)
│       │   └── seed.ts        # Sample data
│       │
│       ├── routes/
│       │   ├── users.ts       # User endpoints
│       │   │   └── 🔴 ISSUE #1: SQL Injection (line 7, 17)
│       │   ├── auth.ts        # Auth endpoints
│       │   │   └── 🔴 ISSUE #2: JWT secret (line 8)
│       │   ├── files.ts       # File endpoints
│       │   │   └── 🔴 ISSUE #6: Path traversal (line 16)
│       │   ├── admin.ts       # Admin endpoints
│       │   │   └── 🔴 ISSUE #9: No auth (line 6, 12)
│       │   └── health.ts      # Health check
│       │       └── 🔴 ISSUE #12: Version exposure (line 8)
│       │
│       ├── middleware/
│       │   ├── auth.ts        # JWT middleware
│       │   │   └── 🔴 ISSUE #3: No rate limit (line 3)
│       │   └── cors.ts        # CORS config docs
│       │
│       └── services/
│           ├── email.ts       # Email service
│           │   └── 🔴 ISSUE #4: SMTP creds (line 2-7)
│           ├── payment.ts     # Payment service
│           │   └── 🔴 ISSUE #7: Stripe key (line 2)
│           └── logger.ts      # Logging utility
│               └── 🔴 ISSUE #10: Sensitive logs (line 4, 13)
│
└── 📦 Data & Uploads
    └── uploads/
        └── sample.txt         # Sample file for path traversal test
```

---

## 🔴 Security Issues (12 Total)

### CRITICAL (5)
1. **SQL Injection** - `routes/users.ts`
2. **Hardcoded JWT Secret** - `routes/auth.ts`
4. **Hardcoded SMTP Credentials** - `services/email.ts`
6. **Path Traversal** - `routes/files.ts`
7. **Hardcoded Stripe Key** - `services/payment.ts`

### HIGH (2)
3. **No Rate Limiting** - `middleware/auth.ts`
9. **No Authentication/Authorization** - `routes/admin.ts`

### MEDIUM (3)
8. **Insecure CORS** - `index.ts`
10. **Logging Sensitive Data** - `services/logger.ts`
11. **Hardcoded Database Password** - `db/connection.ts`

### LOW (1)
12. **Exposing Dependency Versions** - `routes/health.ts`

---

## 📖 Documentation Guide

### For First-Time Users
1. **START HERE:** `README.md` - Understand all 12 issues
2. **THEN:** `ISSUES_MAP.md` - Visual guide to find each issue
3. **USE:** `SECURITY_AUDIT.md` - Checklist while working

### For Quick Reference
- **SUMMARY.md** - High-level overview
- **INDEX.md** - This file (navigation)
- **.env.example** - Secure configuration template

---

## 🚀 Quick Start

```bash
# 1. Verify setup
./test-setup.sh

# 2. Install dependencies
pnpm install

# 3. Create database
pnpm db:seed

# 4. Start server
pnpm dev

# 5. Test an exploit
curl "http://localhost:3001/api/users/1%20OR%201=1"
```

---

## 🎯 Learning Path

### Phase 1: Understand (30 min)
- Read `README.md` sections for each issue
- Understand why each vulnerability is dangerous
- Review OWASP Top 10 mapping in `ISSUES_MAP.md`

### Phase 2: Exploit (1 hour)
- Use exploitation scripts in `SECURITY_AUDIT.md`
- Try SQL injection, path traversal, admin bypass
- Observe the security failures

### Phase 3: Fix (2-3 hours)
- Fix CRITICAL issues first (secrets, injection, traversal)
- Then HIGH issues (auth, rate limiting)
- Finally MEDIUM and LOW issues
- Use `SECURITY_AUDIT.md` checklist to track progress

### Phase 4: Verify (30 min)
- Run exploitation scripts again (should fail)
- Use verification commands in `SECURITY_AUDIT.md`
- Compare with secure patterns in comments

---

## 📊 File Statistics

| Category | Count | Lines |
|----------|-------|-------|
| TypeScript source | 14 | ~500 |
| Documentation | 5 | ~700 |
| Configuration | 5 | ~50 |
| Scripts | 1 | ~60 |
| **Total** | **25** | **~1310** |

---

## 🛡️ Safety Features

1. **TRAINING GUARD** - Prevents production deployment
2. **FAKE Prefixes** - All credentials marked clearly
3. **Mock Services** - No real SMTP/Stripe calls
4. **Local SQLite** - No external database needed

---

## 🔗 Cross-References

| Topic | Files |
|-------|-------|
| SQL Injection | `routes/users.ts`, `db/queries.ts`, README.md §1 |
| Secrets Management | `routes/auth.ts`, `services/email.ts`, `services/payment.ts`, README.md §2,4,7 |
| Authentication | `routes/admin.ts`, `middleware/auth.ts`, README.md §9 |
| Path Traversal | `routes/files.ts`, README.md §6 |
| CORS | `index.ts`, `middleware/cors.ts`, README.md §8 |
| Logging | `services/logger.ts`, README.md §10 |

---

## 🎓 Educational Outcomes

After completing this training, you should be able to:

- ✅ Identify SQL injection vulnerabilities
- ✅ Recognize hardcoded secrets
- ✅ Understand authentication vs authorization
- ✅ Implement rate limiting
- ✅ Configure secure CORS
- ✅ Sanitize file paths
- ✅ Redact sensitive data from logs
- ✅ Map issues to OWASP Top 10

---

## 🔍 Search Tips

### Find all issues:
```bash
grep -rn "ISSUE #" src/
```

### Find hardcoded secrets:
```bash
grep -rn "FAKE_" src/
```

### Find SQL vulnerabilities:
```bash
grep -rn "\`SELECT.*\${" src/
```

### Find missing auth:
```bash
grep -rn "TODO.*auth" src/
```

---

## 📝 Notes

- All credentials are **FAKE** and safe to commit
- No real services are called (mocked)
- SQLite database is local (created on first run)
- Server runs on port **3001** by default
- Production deployment **blocked** by training guard

---

## 🆘 Support

If you get stuck:
1. Check the relevant README.md section
2. Look at code comments (they hint at fixes)
3. Review secure patterns in commented code
4. Compare with .env.example for secrets

---

**Last Updated:** 2026-02-03  
**Version:** 1.0  
**Status:** ✅ Complete (24 files created)
