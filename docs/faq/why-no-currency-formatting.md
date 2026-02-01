---
title: Why doesn't Dinero format with currency symbols?
description: Why Dinero.js doesn't format amounts with currency symbols and how to do it yourself.
---

# Why doesn't Dinero format with currency symbols?

The [`toDecimal`](/api/formatting/to-decimal) function returns a plain decimal string like `"10.50"`, not `"$10.50"` or `"10,50 €"`. **Dinero.js delegates locale-aware formatting to you** because there's no universal default that works for everyone.

Currency formatting varies significantly across locales:

- `en-US`: $10.50
- `fr-FR`: 10,50 $US
- `fr-CA`: 10,50 $ US
- `de-DE`: 10,50 $

Even within the same locale, preferences vary: some users prefer `USD 10.50` over `$10.50`, some applications need `10.50 USD` for data exports. The library can't make these decisions for you.

## Formatting with Intl.NumberFormat

Use [`toDecimal`](/api/formatting/to-decimal) to get the numeric value, then format with [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat):

```ts
import { dinero, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1050, currency: USD });

toDecimal(d, ({ value, currency }) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
  }).format(value);
}); // "$10.50"
```

This lets you choose the locale and currency display style. For more control, you can build your own formatting logic on top of [`toDecimal`](/api/formatting/to-decimal).

See the [Multilingual support](/guides/formatting-in-a-multilingual-site) guide for reusable formatting patterns.
