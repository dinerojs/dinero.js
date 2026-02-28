---
title: Match Calculator Type — Use Matching Currency Imports
impact: HIGH
impactDescription: prevents TypeError from mixing number and bigint arithmetic
tags: imports, bigint, currencies, type-mismatch
---

## Match Calculator Type — Use Matching Currency Imports

Currency definitions from `dinero.js/currencies` use `number` for `base` and `exponent`. Currency definitions from `dinero.js/bigint/currencies` use `bigint`. Mixing them throws a `TypeError`.

**Incorrect (mixing number currencies with bigint calculator):**

```js
import { dinero } from 'dinero.js/bigint';
import { USD } from 'dinero.js/currencies'; // number-typed

// TypeError: Cannot mix BigInt and other types
const d = dinero({ amount: 500n, currency: USD });
```

**Correct (matching imports):**

```js
// Number calculator + number currencies
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';
const d = dinero({ amount: 500, currency: USD });

// Bigint calculator + bigint currencies
import { dinero } from 'dinero.js/bigint';
import { USD } from 'dinero.js/bigint/currencies';
const d = dinero({ amount: 500n, currency: USD });
```

Reference: https://v2.dinerojs.com/faq/why-cant-i-use-currencies-with-bigint
