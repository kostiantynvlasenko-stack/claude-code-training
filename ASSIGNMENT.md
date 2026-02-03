# Code Quality Challenge

## Your mission

You inherited a codebase from a previous team. It works, but has security issues and bad code quality.

**Your job:** Fix it using Claude Code CLI before it goes to production.

---

## Part 1: Fix 3 critical bugs (manually)

These are the most dangerous bugs. Fix them yourself to understand the problems:

### Bug 1: SQL Injection
**File:** `apps/api/src/routes/users.ts`

The code builds SQL queries by concatenating strings. An attacker can inject malicious SQL.

```typescript
// BAD (current code)
db.prepare(`SELECT * FROM users WHERE id = ${req.params.id}`)

// GOOD (fix it like this)
db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id)
```

### Bug 2: XSS (Cross-Site Scripting)
**File:** `apps/web/src/components/UserCard.tsx`

The code renders user input as HTML. An attacker can inject malicious scripts.

```tsx
// BAD (current code)
<div dangerouslySetInnerHTML={{ __html: user.bio }} />

// GOOD (fix it like this)
<div>{user.bio}</div>
```

### Bug 3: Path Traversal
**File:** `apps/api/src/routes/files.ts`

The code doesn't validate filenames. An attacker can access files outside the uploads folder.

```typescript
// BAD (current code)
const filepath = path.join(__dirname, 'uploads', req.params.filename)

// GOOD (fix it like this)
const safeName = path.basename(req.params.filename)
const filepath = path.join(__dirname, 'uploads', safeName)
```

---

## Part 2: Move secrets to .env

Find all `FAKE_` secrets hardcoded in the code and move them to environment variables.

1. Copy the example file: `cp .env.example .env`
2. Find hardcoded secrets: search for `FAKE_` in the codebase
3. Replace them with `process.env.VARIABLE_NAME`

---

## Part 3: Fix the CI pipeline

Open `.github/workflows/ci.yml` and find the `TRAINING_*` comments.

There are 3 things to fix:
- `TRAINING_MISSING_LINT` - uncomment the lint step
- `TRAINING_TESTS_DISABLED` - enable the test command
- `TRAINING_NO_AUDIT` - uncomment the audit step

---

## Part 4: Create automation with Claude Code

Now use Claude Code CLI to automate finding the remaining issues.

### Create a security scanner agent

```bash
claude
> Help me create an agent that finds security issues in the codebase
```

Save it to `.claude/agents/security-scanner.md`

### Create a style checker skill

```bash
> Help me create a skill that checks code style issues
```

Save it to `.claude/commands/check-style.md`

### Find and fix remaining issues

Use your new tools:
```bash
> Use security-scanner to scan the entire codebase
> /project:check-style
```

---

## Part 5: Bonus challenges

### Create a full-check skill
A single command that runs all checks:
```bash
> Help me create a skill that runs security, style, and lint checks together
```

### Enable git hooks
Make checks run automatically before each commit:
```bash
> Help me set up pre-commit hooks with husky
```

---

## How you'll be evaluated

| Level | What you need |
|-------|---------------|
| **Pass** | Fix 3 critical bugs + create 1 agent + create 1 skill + CI is green |
| **Good** | Fix all 7 critical bugs + 2 agents + 3 skills |
| **Excellent** | Fix all high-severity bugs + full-check skill + git hooks working |

---

## Checklist

### Part 1: Manual fixes
- [ ] SQL injection fixed in `apps/api/src/routes/users.ts`
- [ ] XSS fixed in `apps/web/src/components/UserCard.tsx`
- [ ] Path traversal fixed in `apps/api/src/routes/files.ts`
- [ ] `pnpm build` passes

### Part 2: Secrets
- [ ] All `FAKE_` secrets moved to `.env`
- [ ] Code uses `process.env.VARIABLE_NAME`

### Part 3: CI
- [ ] Lint step enabled
- [ ] Test step enabled
- [ ] Audit step enabled
- [ ] CI pipeline is green

### Part 4: Automation
- [ ] Security scanner agent created in `.claude/agents/`
- [ ] Style checker skill created in `.claude/commands/`
- [ ] Remaining issues found and fixed

### Part 5: Bonus
- [ ] Full-check skill created
- [ ] Git hooks working

---

## Demo

At the end, show your mentor:

1. **Run full check:** How do you check the entire project?
2. **Show your tools:** What agents and skills did you create?
3. **Explain the value:** How does this protect the team going forward?

---

## Stuck?

Open `HINTS.md` - it has hints organized by time:
- 30 min - how to create an agent
- 1 hour - how to create a skill
- 1.5 hours - how to combine them
- 2 hours - how to set up hooks
