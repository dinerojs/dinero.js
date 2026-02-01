---
title: Why can't I use currencies with bigint?
description: Why currencies from dinero.js/currencies don't work with bigint and how to use dinero.js/currencies/bigint instead.
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

This is a JavaScript language constraint. To use the bigint variant, import currencies from `dinero.js/currencies/bigint` instead:

```js
import { dinero } from 'dinero.js/bigint';
import { USD } from 'dinero.js/currencies/bigint';

const d = dinero({ amount: 500n, currency: USD });
```

These currencies have bigint values for `base` and `exponent`:

```js
// From dinero.js/currencies/bigint
const USD = { code: 'USD', base: 10n, exponent: 2n };
```

See the [Precision and large numbers](/guides/precision-and-large-numbers) guide for more on when to use bigint.
