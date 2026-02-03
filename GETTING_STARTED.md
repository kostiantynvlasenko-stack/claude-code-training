# Getting Started with an LLM CLI

This guide uses the Claude Code CLI as an example. If you use another tool, replace the command and folder names accordingly.

## Install (example)

```
npm install -g @anthropic-ai/claude-code
```

## Run (example)

```
cd claude-code-training
claude
```

## Core concepts

### Agents (`.claude/agents/`)
Specialized helpers with a clear role and task list.

### Commands (`.claude/commands/`)
Reusable prompts/instructions. Typically invoked as `/project:command-name`.

### Settings (`.claude/settings.json`)
Behavior config, hooks, and automation rules.

## Useful commands (example)
- `/help` - list commands
- `Ctrl+R` - show project rules
- `Ctrl+C` - cancel execution

## Runtime Guard (API)

Add a guard to prevent accidental production deployment:

```ts
if (process.env.NODE_ENV === 'production') {
  console.error('ERROR: This is TRAINING code with intentional bugs.');
  process.exit(1);
}
```

## Database schema (apps/api/schema.sql)

```
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Example vulnerable code

SQL Injection (apps/api/src/routes/users.ts):
```ts
// VULNERABLE - string concatenation
router.get('/users/:id', (req, res) => {
  const user = db.prepare(`SELECT * FROM users WHERE id = ${req.params.id}`).get();
  res.json(user);
});
```

XSS (apps/web/src/components/UserCard.tsx):
```tsx
// VULNERABLE - dangerouslySetInnerHTML
function UserCard({ user }) {
  return <div dangerouslySetInnerHTML={{ __html: user.bio }} />;
}
```

Path Traversal (apps/api/src/routes/files.ts):
```ts
// VULNERABLE - no path validation
router.get('/files/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filepath);
});
```

## Terminology (glossary)

| Term | Description | Location |
|------|-------------|----------|
| Agent | Specialized helper with a role and tasks | `.claude/agents/` |
| Command | Reusable prompt/skill | `.claude/commands/` |
| Rule | Behavior instruction | `.claude/rules/` |
| Hook | Automated action on events | `.claude/settings.json` |

Note: In this challenge you will create agents and commands. Rules and hooks are optional/advanced.
