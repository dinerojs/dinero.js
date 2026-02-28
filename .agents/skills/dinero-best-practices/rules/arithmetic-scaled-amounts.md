---
title: Never Multiply by a Raw Decimal — Use Scaled Amounts
impact: CRITICAL
impactDescription: prevents throws from non-integer intermediate results
tags: arithmetic, multiply, scaled-amounts, decimals
---

## Never Multiply by a Raw Decimal — Use Scaled Amounts

Dinero.js uses integer arithmetic. Multiplying by a decimal that produces a non-integer result will throw. Use scaled amounts instead: `{ amount, scale }` represents `amount / (base ^ scale)`.

**Incorrect (raw decimal multiplier):**

```js
import { dinero, multiply } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1001, currency: USD });
multiply(price, 0.5); // Throws: 1001 * 0.5 = 500.5 (not an integer)
```

**Correct (scaled amount):**

```js
import { dinero, multiply } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1001, currency: USD });
multiply(price, { amount: 5, scale: 1 }); // 5/10 = 0.5, result: amount 5005, scale 3
```

Common scaled amounts:

| Decimal | Scaled amount              |
| ------- | -------------------------- |
| 0.5     | `{ amount: 5, scale: 1 }`  |
| 0.1     | `{ amount: 1, scale: 1 }`  |
| 0.15    | `{ amount: 15, scale: 2 }` |
| 1.5     | `{ amount: 15, scale: 1 }` |

Reference: https://v2.dinerojs.com/faq/can-i-multiply-by-a-decimal
