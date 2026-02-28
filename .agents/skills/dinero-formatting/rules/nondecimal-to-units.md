---
title: Use toUnits for Non-Decimal Currencies, Not toDecimal
impact: MEDIUM
impactDescription: prevents wrong output for currencies with non-base-10 subdivisions
tags: nondecimal, toUnits, formatting, historical-currencies
---

## Use toUnits for Non-Decimal Currencies, Not toDecimal

`toDecimal` assumes a decimal (base 10) currency. For currencies with non-decimal subdivisions (e.g., base 6, base 12, or multi-base like pre-decimal GBP), use `toUnits`.

**Incorrect (toDecimal on non-decimal currency):**

```js
import { dinero, toDecimal } from 'dinero.js';

const GRD = { code: 'GRD', base: 6, exponent: 1 };
const d = dinero({ amount: 9, currency: GRD });

toDecimal(d); // Throws or produces meaningless output
```

**Correct (toUnits with a custom transformer):**

```js
import { dinero, toUnits } from 'dinero.js';

const GRD = { code: 'GRD', base: 6, exponent: 1 };
const d = dinero({ amount: 9, currency: GRD });
const labels = ['drachma', 'obol'];

toUnits(d, ({ value }) =>
  value
    .filter((v) => v > 0)
    .map((v, i) => `${v} ${labels[i]}`)
    .join(', '),
); // "1 drachma, 3 obols"
```

`toUnits` returns an array of unit values, one per subdivision level. It works with any base, including array bases like `[20, 12]` for pre-decimal GBP (pounds, shillings, pence).

Reference: https://v2.dinerojs.com/guides/formatting-non-decimal-currencies
