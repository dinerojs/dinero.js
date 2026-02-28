---
title: Use Scaled Amounts for Fractional Exchange Rates, Not Floats
impact: HIGH
impactDescription: prevents precision loss from floating-point exchange rates
tags: convert, rates, scaled-amounts, exchange-rate
---

## Use Scaled Amounts for Fractional Exchange Rates, Not Floats

When converting between currencies, fractional exchange rates should be passed as scaled amounts (`{ amount, scale }`) instead of floats. This avoids floating-point precision issues.

**Incorrect (float rate):**

```js
import { dinero, convert } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const rates = { EUR: 0.89 }; // Float — imprecise
const d = dinero({ amount: 500, currency: USD });
convert(d, EUR, rates);
```

**Correct (scaled rate):**

```js
import { dinero, convert } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const rates = { EUR: { amount: 89, scale: 2 } }; // 89/100 = 0.89 — precise
const d = dinero({ amount: 500, currency: USD });
convert(d, EUR, rates); // Dinero object with amount 44500, scale 4
```

Integer rates can be passed directly without scaling:

```js
const rates = { IQD: 1199 }; // 1 USD = 1199 IQD (integer, no scaling needed)
convert(d, IQD, rates);
```

Reference: https://v2.dinerojs.com/api/conversions/convert
