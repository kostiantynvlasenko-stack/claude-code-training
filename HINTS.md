# Hints

Open one hint at a time when you feel stuck.

---

<details>
<summary>Hint 1 (after 30 minutes)</summary>

Tired of searching for issues manually? Create a specialized agent.

Try:
1) Create `.claude/agents/`
2) Create `security-scanner.md`
3) Describe what the agent should do

Example:
Role: Security expert
Tasks:
- Find hardcoded credentials
- Detect SQL injection
- Find XSS issues
Output:
- List of issues with file + line numbers

</details>

---

<details>
<summary>Hint 2 (after 1 hour)</summary>

LLM CLIs often support reusable commands (skills).

Create `.claude/commands/check-security.md`:
- Look for hardcoded secrets
- SQL injection in routes
- XSS in components
- Unsafe dependencies

Output:
| Severity | File | Line | Issue |

Then run it using your CLI command prefix.

</details>

---

<details>
<summary>Hint 3 (after 1 hour 30 minutes)</summary>

Combine checks into a single master flow.

Create `.claude/commands/full-check.md`:
1) Security scan
2) Code style check
3) CI readiness check
4) Docs completeness check

Output a summary table by section.

</details>

---

<details>
<summary>Hint 4 (after 2 hours)</summary>

Enable automated checks with hooks.

Option A: CLI hooks (if supported)
Option B: Git hooks (husky + lint-staged)

In this repo, husky is installed but disabled. Enable it by restoring the prepare script
and uncommenting `.husky/pre-commit`.

</details>

---

<details>
<summary>Hint 5 (after 2 hours 30 minutes)</summary>

Write a short README for your tools.

Create `.claude/README.md`:
- List agents
- List skills
- When to use each command

This helps the rest of the team adopt your workflow.

</details>

