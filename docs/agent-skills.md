---
title: Agent Skills
description: Teach your AI coding agent Dinero.js best practices with installable skills.
---

# Agent Skills

If you use AI coding agents like [Claude Code](https://claude.ai/code), [Cursor](https://cursor.sh/), [GitHub Copilot](https://github.com/features/copilot), or any of the [40+ supported agents](https://skills.sh), you can install the Dinero.js skills to teach your agent best practices, common pitfalls, and correct usage patterns.

## Installation

Install all skills:

```bash
npx skills add dinerojs/skills
```

Install a specific skill:

```bash
npx skills add dinerojs/skills --skill dinero-best-practices
```

## Available skills

### `dinero-best-practices`

Core rules for working with Dinero.js: representing amounts in minor units, converting from floats, immutability, using `allocate` instead of manual division, scaled amounts for decimal multipliers, and choosing between `number` and `bigint`.

```bash
npx skills add dinerojs/skills --skill dinero-best-practices
```

### `dinero-formatting`

Formatting money for display: using `toDecimal` for output, composing with `Intl.NumberFormat` for currency symbols and locale-aware formatting, serializing with `toSnapshot`, and formatting non-decimal currencies with `toUnits`.

```bash
npx skills add dinerojs/skills --skill dinero-formatting
```

### `dinero-currency-patterns`

Currency handling patterns: defining type-safe custom currencies, compile-time currency mismatch detection, validating currency codes from external sources, converting with scaled exchange rates, database storage schemas, and payment service integration (Stripe, PayPal, Square).

```bash
npx skills add dinerojs/skills --skill dinero-currency-patterns
```

## What are agent skills?

[Agent skills](https://skills.sh) are reusable instruction sets that extend the capabilities of AI coding agents. They provide specialized guidelines and code patterns that agents follow when working with specific libraries or frameworks.

Skills are agent-agnostic and work across 40+ platforms. When installed, they help your agent write correct Dinero.js code from the start, avoiding common mistakes like passing floats, mixing `number` and `bigint` currency imports, or using `toSnapshot` for display.
