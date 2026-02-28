---
title: Build Reusable Formatters with Intl.NumberFormat
impact: HIGH
impactDescription: eliminates duplicated formatting logic across the codebase
tags: locale, formatter, intl, reusable, higher-order
---

## Build Reusable Formatters with Intl.NumberFormat

Instead of inlining `Intl.NumberFormat` at every call site, build a reusable formatter function.

**Correct (reusable formatter):**

```js
import { toDecimal } from 'dinero.js';

function intlFormat(dineroObject, locale, options = {}) {
  function transformer({ value, currency }) {
    return Number(value).toLocaleString(locale, {
      ...options,
      style: 'currency',
      currency: currency.code,
    });
  }

  return toDecimal(dineroObject, transformer);
}

intlFormat(price, 'en-US'); // "$19.99"
intlFormat(price, 'fr-FR'); // "19,99 $US"
intlFormat(price, 'ja-JP'); // "$19.99"
```

You can also create a higher-order function that bakes in the locale:

```js
function createFormatter(locale, options = {}) {
  return function format(dineroObject) {
    return intlFormat(dineroObject, locale, options);
  };
}

const formatUSD = createFormatter('en-US');
formatUSD(price); // "$19.99"
```

Reference: https://v2.dinerojs.com/guides/formatting-in-a-multilingual-site
