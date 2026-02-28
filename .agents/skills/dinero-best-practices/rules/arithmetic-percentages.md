---
title: Calculate Percentages with allocate or Scaled multiply
impact: HIGH
impactDescription: prevents precision loss and thrown errors on percentage calculations
tags: arithmetic, percentages, tax, discount
---

## Calculate Percentages with allocate or Scaled multiply

There are two safe ways to calculate percentages of a monetary value: `allocate` (for splitting into complementary parts) and `multiply` with a scaled amount (for extracting a percentage).

**Incorrect (float percentage):**

```js
import { dinero, multiply } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const subtotal = dinero({ amount: 5000, currency: USD });
const tax = multiply(subtotal, 0.15); // Risky: may throw if result is non-integer
```

**Correct (allocate for complementary parts):**

```js
import { dinero, allocate } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const subtotal = dinero({ amount: 5000, currency: USD });
const [tax, net] = allocate(subtotal, [15, 85]); // 15% tax, 85% net
```

**Correct (scaled multiply for a single percentage):**

```js
import { dinero, multiply } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const subtotal = dinero({ amount: 5000, currency: USD });
const tax = multiply(subtotal, { amount: 15, scale: 2 }); // 15/100 = 15%
```

Use `allocate` when you need both parts (e.g., tax and net) to guarantee they sum to the original. Use `multiply` when you only need one part.

Reference: https://v2.dinerojs.com/guides/calculating-percentages
