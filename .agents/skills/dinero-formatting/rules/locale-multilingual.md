---
title: Parameterize Locale for Multilingual Sites
impact: HIGH
impactDescription: prevents hardcoded locale strings in formatting logic
tags: locale, multilingual, i18n, internationalization
---

## Parameterize Locale for Multilingual Sites

In multilingual applications, pass the locale as a parameter rather than hardcoding it. This lets you format the same Dinero object differently depending on the user's language.

**Incorrect (hardcoded locale):**

```js
function formatPrice(dineroObject) {
  return toDecimal(dineroObject, ({ value, currency }) => {
    return Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
    });
  });
}
```

**Correct (locale as parameter):**

```js
function formatPrice(dineroObject, locale) {
  return toDecimal(dineroObject, ({ value, currency }) => {
    return Number(value).toLocaleString(locale, {
      style: 'currency',
      currency: currency.code,
    });
  });
}

formatPrice(price, 'en-US'); // "$19.99"
formatPrice(price, 'de-DE'); // "19,99 $"
formatPrice(price, 'ja-JP'); // "$19.99"
```

In React, you can get the locale from your i18n context (e.g., `next-intl`, `react-intl`, `react-i18next`) and pass it to your formatter.

Reference: https://v2.dinerojs.com/guides/formatting-in-a-multilingual-site
