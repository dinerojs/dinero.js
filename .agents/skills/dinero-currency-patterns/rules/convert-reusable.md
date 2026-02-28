---
title: Build Reusable Converter Functions
impact: MEDIUM
impactDescription: eliminates repeated rate passing across conversion call sites
tags: convert, reusable, higher-order, pattern
---

## Build Reusable Converter Functions

When converting many objects with the same rates, wrap `convert` in a higher-order function to avoid passing rates every time.

**Correct (reusable converter):**

```js
import { dinero, convert } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

function createConverter(rates) {
  return function converter(dineroObject, newCurrency) {
    return convert(dineroObject, newCurrency, rates);
  };
}

const rates = { EUR: { amount: 89, scale: 2 } };
const convertWithRates = createConverter(rates);

const price = dinero({ amount: 500, currency: USD });
convertWithRates(price, EUR); // Dinero object in EUR
```

This pattern works well when rates are fetched once per request or session and reused across multiple conversions.

Reference: https://v2.dinerojs.com/api/conversions/convert
