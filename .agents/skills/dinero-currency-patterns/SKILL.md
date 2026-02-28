---
name: dinero-currency-patterns
description: >
  Currency handling patterns for the Dinero.js money library. Use when working
  with multiple currencies, converting between currencies, defining custom
  currencies, storing monetary values in databases, or integrating with payment
  services like Stripe or PayPal. Triggers on currency conversion, database
  schema design for money, or payment API integration with Dinero objects.
license: MIT
metadata:
  author: dinerojs
  version: '1.0.0'
---

# Dinero.js Currency Patterns

Patterns for handling currencies with [Dinero.js](https://v2.dinerojs.com): type safety, conversions, custom currencies, database storage, and payment service integration.

## When to Apply

Reference these guidelines when:

- Converting between currencies with `convert`
- Defining custom currencies (e.g., cryptocurrencies, loyalty points)
- Looking up currencies dynamically from external input
- Storing monetary values in a database
- Integrating with payment services (Stripe, PayPal, Square)

## Rule Categories by Priority

| Priority | Category            | Impact | Prefix     |
| -------- | ------------------- | ------ | ---------- |
| 1        | Type Safety         | HIGH   | `types-`   |
| 2        | Conversion          | HIGH   | `convert-` |
| 3        | Storage             | HIGH   | `storage-` |
| 4        | Payment Integration | MEDIUM | `payment-` |

## Quick Reference

### 1. Type Safety (HIGH)

- `types-as-const` - Define custom currencies with `as const satisfies` for compile-time safety
- `types-currency-mismatch` - TypeScript catches currency mismatches in operations at compile time
- `types-lookup-validation` - Validate currency codes from external sources at runtime

### 2. Conversion (HIGH)

- `convert-scaled-rates` - Use scaled amounts for fractional exchange rates, not floats
- `convert-reusable` - Build reusable converter functions with higher-order patterns

### 3. Storage (HIGH)

- `storage-database` - Store amount, currency code, and scale as separate columns
- `storage-no-money-type` - Avoid PostgreSQL's `money` type for multi-currency applications

### 4. Payment Integration (MEDIUM)

- `payment-services` - Map Dinero objects to payment service formats with dedicated helpers

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/types-as-const.md
rules/convert-scaled-rates.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references
