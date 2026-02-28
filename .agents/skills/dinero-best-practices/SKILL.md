---
name: dinero-best-practices
description: >
  Core best practices for the Dinero.js money library. Use when writing,
  reviewing, or refactoring code that creates Dinero objects, performs
  arithmetic on monetary values, or handles money in JavaScript/TypeScript.
  Triggers on imports from 'dinero.js', monetary calculations, or price/cost
  handling logic.
license: MIT
metadata:
  author: dinerojs
  version: '1.0.0'
---

# Dinero.js Best Practices

Core rules for working with [Dinero.js](https://v2.dinerojs.com), the JavaScript/TypeScript library for creating, calculating, and formatting money safely. Contains rules across 4 categories, prioritized by impact.

## When to Apply

Reference these guidelines when:

- Creating Dinero objects from user input, API responses, or database values
- Performing arithmetic on monetary values (adding, splitting, multiplying)
- Choosing between `number` and `bigint` calculators
- Importing from `dinero.js`, `dinero.js/currencies`, or `dinero.js/bigint`
- Working with prices, costs, taxes, or any financial calculation

## Rule Categories by Priority

| Priority | Category        | Impact   | Prefix        |
| -------- | --------------- | -------- | ------------- |
| 1        | Object Creation | CRITICAL | `creation-`   |
| 2        | Arithmetic      | CRITICAL | `arithmetic-` |
| 3        | Precision       | HIGH     | `precision-`  |
| 4        | Imports         | MEDIUM   | `imports-`    |

## Quick Reference

### 1. Object Creation (CRITICAL)

- `creation-minor-units` - Always pass amounts as integers in minor currency units
- `creation-from-floats` - Use a helper to convert float inputs to minor units
- `creation-zero-exponent` - Currencies with exponent 0 (e.g., JPY) take major units directly

### 2. Arithmetic (CRITICAL)

- `arithmetic-immutability` - All operations return new objects; capture the return value
- `arithmetic-allocate-not-divide` - Use `allocate` for splitting money, not manual division
- `arithmetic-scaled-amounts` - Never multiply by a raw decimal; use scaled amounts
- `arithmetic-percentages` - Calculate percentages with `allocate` or scaled `multiply`

### 3. Precision (HIGH)

- `precision-bigint` - Use `dinero.js/bigint` for amounts exceeding `Number.MAX_SAFE_INTEGER`
- `precision-crypto` - Cryptocurrencies require bigint due to high exponents
- `precision-trim-scale` - Use `trimScale` to remove trailing zeros after chained operations

### 4. Imports (MEDIUM)

- `imports-tree-shaking` - Import only what you use; standalone functions enable tree-shaking
- `imports-bigint-currencies` - Match calculator type: use `dinero.js/bigint/currencies` with `dinero.js/bigint`

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/creation-minor-units.md
rules/arithmetic-allocate-not-divide.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references
