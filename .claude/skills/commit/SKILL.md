---
name: commit
description: Create a git commit with optional automatic Linear issue linking. Use when the user asks to commit.
---

## Workflow

### Step 1: Analyze Changes

Run these commands to understand what's being committed:

```bash
git status
git diff --staged
git diff
```

If there are no staged changes, ask the user what to stage or suggest relevant files based on unstaged changes.

### Step 2: Find Related Linear Issues

Use the Linear MCP tools to search for related issues:

1. **List open issues** in the Dinero.js project:
   ```
   mcp__linear-server__list_issues with:
   - project: "Dinero.js v2.0.0 Stable Release"
   - state: "backlog" or "in_progress" or "todo"
   ```

2. **Search by keywords** from the changes (function names, file paths, feature areas)

3. Present matching issues to the user in a table:
   | ID | Title | Status |
   |----|-------|--------|
   | SAR-110 | Restructure packages... | Backlog |

### Step 3: User Selection

Ask the user using AskUserQuestion:
- Which issue(s) does this commit relate to?
- Does this commit **complete** the issue (Fixes) or is it **partial progress** (Part of)?

Options:
- Select from found issues
- Enter a different issue ID
- No Linear issue (skip linking)

### Step 4: Create Commit

Generate a commit message following Conventional Commits format:

```
type(scope): subject

Description of changes.

[Fixes|Part of] SAR-XXX

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

**Types:** feat, fix, docs, refactor, test, chore, style, perf
**Scopes:** core, currencies, calculator-number, calculator-bigint, dinero.js, examples, docs, build, ci

### Step 5: Execute

1. Stage files if needed (prefer specific files over `git add -A`)
2. Create the commit using a HEREDOC for proper formatting
3. Run `git status` to confirm success
4. If the commit completes an issue, offer to update it in Linear using `mcp__linear-server__update_issue`

## Examples

### Completing an issue
```bash
git commit -m "$(cat <<'EOF'
feat(core): add subpath exports for currencies

Implemented exports field in package.json with proper TypeScript support
for all subpath entries.

Fixes SAR-111

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### Partial progress
```bash
git commit -m "$(cat <<'EOF'
refactor(core): extract currency types to separate module

First step in restructuring packages for consolidated dinero.js package.

Part of SAR-110

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

### No Linear issue
```bash
git commit -m "$(cat <<'EOF'
chore: update .gitignore

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```
