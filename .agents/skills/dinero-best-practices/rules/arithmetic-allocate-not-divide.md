---
title: Use allocate for Splitting Money, Not Manual Division
impact: CRITICAL
impactDescription: prevents lost cents from rounding
tags: arithmetic, allocate, division, remainder
---

## Use allocate for Splitting Money, Not Manual Division

When splitting money between parties, use `allocate` instead of dividing manually. `allocate` distributes remainders so no money is lost.

**Incorrect (manual division loses money):**

```js
import { dinero, multiply } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const total = dinero({ amount: 1003, currency: USD }); // $10.03

// Splitting three ways: 1003 / 3 = 334.33... — where does the extra cent go?
const share = multiply(total, { amount: 1, scale: 0 }); // No good way to split evenly
```

**Correct (allocate distributes remainders):**

```js
import { dinero, allocate } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const total = dinero({ amount: 1003, currency: USD }); // $10.03

const shares = allocate(total, [1, 1, 1]);
// [$3.35, $3.34, $3.34] — extra cent goes to the first share
```

The ratios in `allocate` are relative. `[1, 1, 1]` splits evenly. `[70, 20, 10]` splits 70%/20%/10%.

Reference: https://v2.dinerojs.com/api/mutations/allocate
