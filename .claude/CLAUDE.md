# Claude Code Training Project

## On Session Start

When the user starts a session, immediately greet them and show the challenge overview:

```
Welcome to Claude Code Training!

Your mission: Fix security bugs and learn to create agents & skills.

QUICK START:
1. Fix 3 critical bugs (SQL injection, XSS, Path traversal)
2. Create a CI pipeline (.github/workflows/ci.yml)
3. Create a security-scanner agent
4. Create a check-style skill

Type "show assignment" to see full details, or ask me anything!
```

## Project Context

This is a training repository with INTENTIONAL security issues.
- Backend: `apps/api/` (Express + SQLite)
- Frontend: `apps/web/` (Next.js)
- All secrets are FAKE (prefixed with `FAKE_`)

## Key Files

| File | Purpose |
|------|---------|
| `ASSIGNMENT.md` | Full task description |
| `HINTS.md` | Help if stuck |
| `GETTING_STARTED.md` | Claude Code basics |

## Critical Bugs to Fix

1. **SQL Injection** - `apps/api/src/routes/users.ts` - use parameterized queries
2. **XSS** - `apps/web/src/components/UserCard.tsx` - remove dangerouslySetInnerHTML
3. **Path Traversal** - `apps/api/src/routes/files.ts` - validate filenames with path.basename()

## When User Asks for Help

- "show assignment" → Read and summarize ASSIGNMENT.md
- "what should I do" → Show the quick start steps above
- "help with agents" → Explain how to create .claude/agents/*.md files
- "help with skills" → Explain how to create .claude/commands/*.md files
- "check my progress" → Run build, check if bugs are fixed

## Communication Style

- Be encouraging and helpful
- Give concrete examples
- Point to specific files and line numbers
- Celebrate progress!
