# Code Quality Challenge

## Context
You received a repository from a previous team. The app works, but code quality is questionable.
Your task is to harden it before it goes to production.

## What you must do

### Mandatory (manual)
- [ ] Fix 3 critical issues:
  - SQL injection in `apps/api/src/routes/users.ts`
  - XSS in `apps/web/src/components/UserCard.tsx`
  - Path traversal in `apps/api/src/routes/files.ts`
- [ ] Move FAKE_ secrets from code into `.env` (copy from `.env.example`)
- [ ] Fix the CI pipeline (find `# TRAINING_*` markers in `.github/workflows/ci.yml`)

### Automate (using your LLM CLI)
- [ ] Create an agent to find remaining security issues
- [ ] Create a skill/command for code style checks
- [ ] Find and fix the remaining issues via automation

### Bonus
- [ ] Create a `full-check` skill that runs all checks
- [ ] Enable hooks for automated checks

## Tools
Use your preferred LLM CLI.

## Definition of done
| Level | Requirements |
|-------|--------------|
| Minimum | 3 critical fixes + 1 agent + 1 skill + green CI |
| Good | All critical (7) fixed via agents/skills + 2 agents + 3 skills |
| Excellent | All high (6) + full-check skill + hooks enabled |

Note: All remaining critical/high issues (other than the 3 manual ones) must be addressed via automation.

## Database
This project uses SQLite (`apps/api/data.sqlite`). Docker is not required.
Commands:
- `pnpm db:seed` - recreate test data
- `pnpm db:reset` - reset to the initial state

## Demo at the end
Show:
1) How to run a full project check
2) Which agents/skills you created and how they work
3) How this protects the team from similar issues in the future

## Self-checks

After fixing the 3 critical issues:
- [ ] `pnpm build` passes without errors
- [ ] `routes/users.ts` uses a parameterized query
- [ ] `UserCard.tsx` does not use dangerouslySetInnerHTML
- [ ] `routes/files.ts` validates or sanitizes filenames

After creating an agent:
- [ ] The file is under `.claude/agents/`
- [ ] It has Role and Tasks sections
- [ ] Your CLI understands the agent's purpose

After creating a command/skill:
- [ ] The file is under `.claude/commands/`
- [ ] You can invoke it via your CLI command prefix
