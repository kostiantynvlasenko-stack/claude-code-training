# Training API - Intentional Security Vulnerabilities

⚠️ **WARNING: This code contains intentional security vulnerabilities for training purposes. DO NOT deploy to production.**

## Setup

```bash
# Install dependencies
pnpm install

# Seed database
pnpm db:seed

# Run development server
pnpm dev
```

Server will run on `http://localhost:3001`

## Security Issues (12 Total)

### CRITICAL Severity

#### 1. SQL Injection (ISSUE #1)
**Location:** `src/routes/users.ts`

```typescript
// VULNERABLE
const user = db.prepare(`SELECT * FROM users WHERE id = ${id}`).get();
```

**Exploit:**
```bash
# Get all users
curl http://localhost:3001/api/users/1%20OR%201=1

# Search injection
curl "http://localhost:3001/api/users/search?q=a'%20OR%201=1--"
```

**Fix:**
```typescript
// Use parameterized queries
const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
```

---

#### 2. Hardcoded JWT Secret (ISSUE #2)
**Location:** `src/routes/auth.ts`

```typescript
// VULNERABLE
const JWT_SECRET = 'FAKE_JWT_SECRET_DO_NOT_USE_super_secret_key_12345';
```

**Exploit:**
Anyone with the secret can forge valid tokens.

**Fix:**
```typescript
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET not set');
```

---

#### 4. Hardcoded SMTP Credentials (ISSUE #4)
**Location:** `src/services/email.ts`

```typescript
// VULNERABLE
const SMTP_CONFIG = {
  user: 'FAKE_smtp_user@example.com',
  password: 'FAKE_SMTP_PASSWORD_DO_NOT_USE_training123',
};
```

**Fix:**
```typescript
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASS,
};
```

---

#### 6. Path Traversal (ISSUE #6)
**Location:** `src/routes/files.ts`

```typescript
// VULNERABLE
const filepath = path.join(UPLOADS_DIR, filename);
```

**Exploit:**
```bash
# Access any file on the system
curl http://localhost:3001/api/files/../../etc/passwd
curl http://localhost:3001/api/files/../../.ssh/id_rsa
```

**Fix:**
```typescript
// Sanitize filename
const safeName = path.basename(filename);
const filepath = path.join(UPLOADS_DIR, safeName);
```

---

#### 7. Hardcoded Stripe Key (ISSUE #7)
**Location:** `src/services/payment.ts`

```typescript
// VULNERABLE
const STRIPE_SECRET_KEY = 'sk_test_FAKE_DO_NOT_USE_IN_PRODUCTION_stripe_key_12345';
```

**Fix:**
```typescript
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY not set');
```

---

### HIGH Severity

#### 3. No Rate Limiting (ISSUE #3)
**Location:** `src/middleware/auth.ts`

**Exploit:**
Brute force login attempts.

**Fix:**
```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts',
});

authRouter.post('/login', loginLimiter, (req, res) => { ... });
```

---

#### 9. No Authentication/Authorization (ISSUE #9)
**Location:** `src/routes/admin.ts`

```typescript
// VULNERABLE - Anyone can access admin endpoints
adminRouter.get('/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.json(users);
});
```

**Exploit:**
```bash
# Anyone can list all users
curl http://localhost:3001/api/admin/users

# Anyone can delete users
curl -X DELETE http://localhost:3001/api/admin/users/1
```

**Fix:**
```typescript
import { authMiddleware } from '../middleware/auth';

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}

adminRouter.use(authMiddleware);
adminRouter.use(requireAdmin);
```

---

### MEDIUM Severity

#### 8. Insecure CORS (ISSUE #8)
**Location:** `src/index.ts`

```typescript
// VULNERABLE
app.use(cors({ origin: '*' }));
```

**Fix:**
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
```

---

#### 10. Logging Sensitive Data (ISSUE #10)
**Location:** `src/services/logger.ts`

```typescript
// VULNERABLE - Logs passwords and tokens
console.log('[Request]', {
  body: req.body, // Includes passwords!
  headers: req.headers, // Includes auth tokens!
});
```

**Fix:**
```typescript
export function logRequestSafe(req: any) {
  const safeBody = { ...req.body };
  delete safeBody.password;
  delete safeBody.token;

  const safeHeaders = { ...req.headers };
  delete safeHeaders.authorization;

  console.log('[Request]', {
    method: req.method,
    path: req.path,
    body: safeBody,
    headers: safeHeaders,
  });
}
```

---

#### 11. Hardcoded Database Password (ISSUE #11)
**Location:** `src/db/connection.ts`

```typescript
// VULNERABLE
const DB_PASSWORD = 'FAKE_DB_PASSWORD_DO_NOT_USE_IN_PRODUCTION';
```

**Note:** SQLite doesn't actually use passwords, but this demonstrates the anti-pattern.

**Fix:**
```typescript
const DB_PASSWORD = process.env.DB_PASSWORD;
```

---

### LOW Severity

#### 12. Exposing Dependency Versions (ISSUE #12)
**Location:** `src/routes/health.ts`

```typescript
// VULNERABLE - Helps attackers find vulnerable dependencies
res.json({
  dependencies: packageJson.dependencies,
  nodeVersion: process.version,
});
```

**Fix:**
```typescript
// Only expose status
res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
});
```

---

## Training Exercises

1. **SQL Injection**
   - Exploit users endpoint to get all users
   - Exploit search to bypass authentication
   - Fix with parameterized queries

2. **Authentication Bypass**
   - Access admin endpoints without login
   - Fix by adding authMiddleware and role checks

3. **Path Traversal**
   - Read arbitrary files from the system
   - Fix by sanitizing filenames

4. **Secrets Management**
   - Find all hardcoded secrets
   - Move to environment variables
   - Use dotenv for local development

5. **Rate Limiting**
   - Write script to brute force login
   - Add express-rate-limit

6. **CORS**
   - Exploit cross-origin requests
   - Restrict to specific origin

## Production Checklist

Before deploying any API:

- [ ] All secrets in environment variables
- [ ] SQL queries use prepared statements
- [ ] Authentication on all protected routes
- [ ] Authorization checks (role-based)
- [ ] Rate limiting on auth endpoints
- [ ] CORS restricted to known origins
- [ ] Input validation on all endpoints
- [ ] Output encoding to prevent XSS
- [ ] HTTPS only (no HTTP)
- [ ] Security headers (Helmet.js)
- [ ] Dependency scanning (npm audit)
- [ ] Logging excludes sensitive data

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
