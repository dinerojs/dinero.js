---
title: Define Custom Currencies with as const satisfies for Type Safety
impact: HIGH
impactDescription: enables compile-time currency mismatch detection
tags: types, currency, typescript, as-const, custom-currency
---

## Define Custom Currencies with as const satisfies for Type Safety

When defining custom currencies (e.g., cryptocurrencies, loyalty points), use `as const satisfies` to get a literal type for the `code` property. Without it, TypeScript infers `string`, losing compile-time currency mismatch detection.

**Incorrect (code inferred as string):**

```ts
import type { Currency } from 'dinero.js';

const BTC = { code: 'BTC', base: 10, exponent: 8 };
// typeof BTC.code is string, not 'BTC'
```

**Correct (literal type with as const satisfies):**

```ts
import type { Currency } from 'dinero.js';

const BTC = {
  code: 'BTC',
  base: 10,
  exponent: 8,
} as const satisfies Currency<number, 'BTC'>;
// typeof BTC.code is 'BTC'
```

With literal types, TypeScript catches mistakes like adding BTC and USD at compile time:

```ts
const btcAmount = dinero({ amount: 100000000, currency: BTC });
const usdAmount = dinero({ amount: 500, currency: USD });
add(btcAmount, usdAmount); // Type error: 'USD' is not assignable to 'BTC'
```

All built-in currencies from `dinero.js/currencies` already have literal types.

Reference: https://v2.dinerojs.com/guides/currency-type-safety
