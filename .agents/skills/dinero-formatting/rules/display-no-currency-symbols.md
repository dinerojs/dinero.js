---
title: Dinero.js Does Not Format Currency Symbols — Compose with Intl.NumberFormat
impact: CRITICAL
impactDescription: prevents missing currency symbols in UI
tags: display, currency-symbols, intl, numberformat
---

## Dinero.js Does Not Format Currency Symbols — Compose with Intl.NumberFormat

`toDecimal` returns a plain decimal string like `"19.99"`, not `"$19.99"`. This is by design: currency formatting varies by locale (`$19.99` in en-US, `19,99 $US` in fr-CA, `19,99 $` in fr-FR). Use `toDecimal` with a transformer to add locale-aware formatting.

**Incorrect (expecting currency symbols from toDecimal):**

```js
import { dinero, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1999, currency: USD });
toDecimal(price); // "19.99" — no currency symbol
```

**Correct (composing with Intl.NumberFormat):**

```js
import { dinero, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1999, currency: USD });

toDecimal(price, ({ value, currency }) => {
  return Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: currency.code,
  });
}); // "$19.99"
```

Reference: https://v2.dinerojs.com/faq/why-no-currency-formatting
