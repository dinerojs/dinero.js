---
title: Can I multiply by a decimal?
description: How to multiply Dinero objects by decimal values like 0.5 using scaled amounts.
---

# Can I multiply by a decimal?

You can pass a decimal like `0.5` to [`multiply`](/api/mutations/multiply), but **it will throw an error if the result isn't an integer.**

```js
import { dinero, multiply } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d1 = dinero({ amount: 1000, currency: USD }); // $10.00
multiply(d1, 0.5); // Works (1000 * 0.5 = 500)

const d2 = dinero({ amount: 1001, currency: USD }); // $10.01
multiply(d2, 0.5); // Throws (1001 * 0.5 = 500.5)
```

Dinero.js uses integer arithmetic to avoid floating-point precision issues. When you multiply by a decimal and the result isn't an integer, validation fails.

## Using scaled amounts

The safe way to multiply by non-integers is to use a scaled amount. Instead of `0.5`, pass `{ amount: 5, scale: 1 }` (5 at scale 1 = 5/10 = 0.5):

```js
import { dinero, multiply, toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1001, currency: USD }); // $10.01

const result = multiply(d, { amount: 5, scale: 1 }); // $5.005

toSnapshot(result); // { amount: 5005, currency: USD, scale: 3 }
```

**The result's scale increases to preserve precision.** This keeps all values as integers throughout the calculation.

::: tip
For percentages, the pattern is the same. To calculate 15% of an amount:

```js
multiply(d, { amount: 15, scale: 2 }); // 15 at scale 2 = 0.15
```
:::

See the [Calculating percentages](/guides/calculating-percentages) guide for more examples.
