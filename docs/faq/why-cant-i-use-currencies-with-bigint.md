---
title: Why can't I use currencies with bigint?
description: Why currencies from dinero.js/currencies don't work with bigint and how to define your own.
---

# Why can't I use currencies with bigint?

Currencies from `dinero.js/currencies` have `number` values for `base` and `exponent`:

```js
// From dinero.js/currencies
const USD = { code: 'USD', base: 10, exponent: 2 };
```

When using `dinero.js/bigint`, **all arithmetic operations use bigint math.** JavaScript doesn't allow mixing `number` and `bigint` in operations—it throws a `TypeError`:

```js
10n + 2  // TypeError: can't convert BigInt to number
```

This is a JavaScript language constraint. To work around it, you must define currencies with bigint values when using the bigint variant:

```js
import { dinero } from 'dinero.js/bigint';

const USD = {
  code: 'USD',
  base: 10n,
  exponent: 2n,
};

const d = dinero({ amount: 500n, currency: USD });
```

::: tip
If you're using bigint for a few currencies, defining them manually is straightforward. For many currencies, you can write a helper to convert them:

```js
function toBigIntCurrency(currency) {
  return {
    code: currency.code,
    base: BigInt(currency.base),
    exponent: BigInt(currency.exponent),
  };
}
```
:::

See the [Precision and large numbers](/guides/precision-and-large-numbers) guide for more on when to use bigint.
