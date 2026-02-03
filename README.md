# Claude Code CLI Training

> Learn to use Claude Code CLI by fixing a broken codebase

---

## What is this?

This is a **training exercise**. You will use [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) to find and fix problems in this codebase.

The code has **intentional bugs and security issues**. Your job is to:
1. Find them using Claude Code
2. Create agents and skills to automate the process
3. Fix everything and make CI green

---

## Step 1: Install Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
```

Verify it works:
```bash
claude --version
```

---

## Step 2: Clone this repo

```bash
git clone https://github.com/kostiantynvlasenko-stack/claude-code-training.git
cd claude-code-training
```

---

## Step 3: Setup the project

**Requirements:** Node.js 20+ and pnpm 8+

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Copy environment file
cp .env.example .env

# Install dependencies
pnpm install

# Seed the database
pnpm db:seed
```

---

## Step 4: Run the apps (optional)

```bash
# Terminal 1 - Backend API
pnpm --filter @training/api dev

# Terminal 2 - Frontend
pnpm --filter @training/web dev
```

- API: http://localhost:4000
- Web: http://localhost:3000

---

## Step 5: Start the challenge

```bash
# Launch Claude Code CLI
claude
```

Then read the assignment:

```
> Read ASSIGNMENT.md and tell me what I need to do
```

Or just open `ASSIGNMENT.md` in your editor.

---

## What you will learn

| Concept | What it does |
|---------|--------------|
| **Agents** | Specialized AI assistants for specific tasks |
| **Skills** | Reusable commands you can call with `/project:name` |
| **Hooks** | Automatic checks on git commit |

---

## Stuck?

Open `HINTS.md` - it has timed hints (30min, 1hr, 1.5hr, 2hr).

---

## Warning

This code is **intentionally vulnerable**. Never use it in production.

All secrets are fake (prefixed with `FAKE_`).

---

## Files overview

```
ASSIGNMENT.md     <- Your task (START HERE after setup)
HINTS.md          <- Hints if you're stuck
GETTING_STARTED.md <- Claude Code CLI basics

apps/
  api/            <- Express backend (has security bugs)
  web/            <- Next.js frontend (has security bugs)

packages/
  shared/         <- Shared TypeScript types
```

---

## Success criteria

| Level | Requirements |
|-------|--------------|
| **Pass** | Fix 3 critical bugs manually + create 1 agent + 1 skill + CI green |
| **Good** | Fix all 7 critical bugs + 2 agents + 3 skills |
| **Excellent** | Fix all high-severity bugs + full-check skill + git hooks |

---

**Ready? Run `claude` and start with ASSIGNMENT.md!**
