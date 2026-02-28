---
name: dinero-formatting
description: >
  Formatting patterns for the Dinero.js money library. Use when displaying
  monetary values to users, formatting prices with currency symbols, handling
  locale-specific number formats, or working with non-decimal currencies.
  Triggers on toDecimal, toUnits, toSnapshot calls, or Intl.NumberFormat
  usage with Dinero objects.
license: MIT
metadata:
  author: dinerojs
  version: '1.0.0'
---

# Dinero.js Formatting

Patterns for formatting [Dinero.js](https://v2.dinerojs.com) monetary values for display. Covers currency symbols, locale-aware formatting, non-decimal currencies, and serialization.

## When to Apply

Reference these guidelines when:

- Displaying prices, totals, or monetary values in a UI
- Adding currency symbols or locale-specific formatting
- Formatting non-decimal currencies (e.g., historical currencies with non-base-10 subdivisions)
- Serializing Dinero objects for APIs, databases, or transport
- Building reusable formatting utilities

## Rule Categories by Priority

| Priority | Category      | Impact   | Prefix           |
| -------- | ------------- | -------- | ---------------- |
| 1        | Display       | CRITICAL | `display-`       |
| 2        | Locale        | HIGH     | `locale-`        |
| 3        | Serialization | HIGH     | `serialization-` |
| 4        | Non-Decimal   | MEDIUM   | `nondecimal-`    |

## Quick Reference

### 1. Display (CRITICAL)

- `display-to-decimal` - Use `toDecimal` for display strings, not `toSnapshot`
- `display-no-currency-symbols` - Dinero.js does not format currency symbols; compose with `Intl.NumberFormat`

### 2. Locale (HIGH)

- `locale-intl-formatter` - Build reusable formatters with `Intl.NumberFormat`
- `locale-multilingual` - Create locale-parameterized formatters for multilingual sites

### 3. Serialization (HIGH)

- `serialization-snapshot` - Use `toSnapshot` for transport and storage, not display
- `serialization-bigint-json` - BigInt Dinero objects require a custom JSON replacer

### 4. Non-Decimal (MEDIUM)

- `nondecimal-to-units` - Use `toUnits` for non-decimal currencies, not `toDecimal`

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/display-no-currency-symbols.md
rules/locale-intl-formatter.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references
