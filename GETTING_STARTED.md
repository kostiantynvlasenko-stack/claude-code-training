# Getting Started with Claude Code CLI

This guide teaches you the basics of Claude Code CLI.

---

## 1. What is Claude Code CLI?

A command-line AI assistant that can:
- Read and understand your codebase
- Find bugs and security issues
- Write and edit code
- Run commands

---

## 2. Basic usage

```bash
# Start Claude Code in your project folder
cd claude-code-training
claude
```

Now you can chat with Claude about your code:

```
> What files are in this project?
> Find all TODO comments
> Explain what apps/api/src/routes/users.ts does
```

---

## 3. Useful commands

| Command | What it does |
|---------|--------------|
| `/help` | Show all commands |
| `/clear` | Clear conversation |
| `Ctrl+C` | Stop current task |
| `Ctrl+R` | Show project rules |

---

## 4. Creating an Agent

Agents are specialized helpers. Create a file in `.claude/agents/`:

**Example: `.claude/agents/security-scanner.md`**

```markdown
# Security Scanner

## Role
You are a security expert who finds vulnerabilities in code.

## Tasks
1. Find hardcoded secrets (API keys, passwords)
2. Find SQL injection vulnerabilities
3. Find XSS vulnerabilities
4. Find path traversal vulnerabilities

## How to report
For each issue found, report:
- File path and line number
- Severity (CRITICAL/HIGH/MEDIUM/LOW)
- Description of the problem
- How to fix it
```

**How to use it:**

```
> Use the security-scanner agent to scan apps/api/
```

---

## 5. Creating a Skill (Command)

Skills are reusable prompts. Create a file in `.claude/commands/`:

**Example: `.claude/commands/check-security.md`**

```markdown
Scan the codebase for security issues.

Look for:
1. Hardcoded API keys and secrets
2. SQL injection (string concatenation in queries)
3. XSS (dangerouslySetInnerHTML)
4. Path traversal (unsanitized file paths)

Output format:
| Severity | File | Line | Issue |
|----------|------|------|-------|
```

**How to use it:**

```
> /project:check-security
```

---

## 6. Project structure for Claude Code

```
your-project/
├── .claude/
│   ├── agents/           <- Your agents go here
│   │   └── security-scanner.md
│   ├── commands/         <- Your skills go here
│   │   └── check-security.md
│   └── settings.json     <- (optional) hooks and config
└── ... your code ...
```

---

## 7. Tips for this training

### Start simple
```
> Read ASSIGNMENT.md
> What are the 3 critical bugs I need to fix?
```

### Ask Claude to explain
```
> What is SQL injection?
> Show me the SQL injection bug in apps/api/src/routes/users.ts
```

### Create tools as you go
When you find yourself repeating a task, create a skill for it:
```
> Help me create a skill that checks for hardcoded secrets
```

---

## 8. Example workflow

```
# 1. Start Claude Code
claude

# 2. Understand the task
> Read ASSIGNMENT.md and summarize what I need to do

# 3. Find a bug
> Find SQL injection vulnerabilities in apps/api/

# 4. Fix it
> Fix the SQL injection in apps/api/src/routes/users.ts

# 5. Create automation
> Help me create an agent that can find all security issues
```

---

## 9. Glossary

| Term | What it is | Where it lives |
|------|------------|----------------|
| **Agent** | AI helper with a specific role | `.claude/agents/` |
| **Skill/Command** | Reusable prompt | `.claude/commands/` |
| **Hook** | Auto-run on events (commit, etc.) | `.claude/settings.json` |

---

## Need more help?

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- Open `HINTS.md` for task-specific hints
