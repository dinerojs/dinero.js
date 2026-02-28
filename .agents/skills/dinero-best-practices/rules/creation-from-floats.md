---
title: Convert Float Inputs to Minor Units with a Helper
impact: CRITICAL
impactDescription: prevents throws and precision bugs from float inputs
tags: creation, floats, conversion, external-input
---

## Convert Float Inputs to Minor Units with a Helper

When receiving float values from external sources (APIs, user input, databases), convert them to integer minor units before creating a Dinero object. Never pass floats directly.

**Incorrect (passing a float directly):**

```js
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const priceFromApi = 19.99;
const d = dinero({ amount: priceFromApi, currency: USD }); // Throws
```

**Correct (converting with a helper):**

```js
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

function dineroFromFloat({ amount: float, currency, scale }) {
  const factor = currency.base ** (scale ?? currency.exponent);
  const amount = Math.round(float * factor);

  return dinero({ amount, currency, scale });
}

const priceFromApi = 19.99;
const d = dineroFromFloat({ amount: priceFromApi, currency: USD }); // $19.99
```

`Math.round` is necessary to avoid floating-point artifacts (e.g., `19.99 * 100` evaluates to `1998.9999999999998` in JavaScript).

Reference: https://v2.dinerojs.com/guides/creating-from-floats
