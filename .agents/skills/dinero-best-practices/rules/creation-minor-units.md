---
title: Always Pass Amounts as Integers in Minor Currency Units
impact: CRITICAL
impactDescription: prevents silent off-by-100x errors
tags: creation, amount, minor-units, cents
---

## Always Pass Amounts as Integers in Minor Currency Units

Dinero.js represents money in the smallest subdivision of a currency. For USD (exponent 2), the amount is in cents. Passing a major-unit value silently creates the wrong amount.

**Incorrect (passing major units or floats):**

```js
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

// Wrong: 50 cents, not 50 dollars
const d = dinero({ amount: 50, currency: USD });

// Wrong: throws on non-integer
const d = dinero({ amount: 19.99, currency: USD });
```

**Correct (minor units as integers):**

```js
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d1 = dinero({ amount: 5000, currency: USD }); // $50.00
const d2 = dinero({ amount: 1999, currency: USD }); // $19.99
```

Reference: https://v2.dinerojs.com/core-concepts/amount
