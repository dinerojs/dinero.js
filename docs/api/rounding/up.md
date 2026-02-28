---
title: up
description: Divide and round towards positive infinity.
---

# up

Divide and round towards positive infinity.

This rounding mode always rounds up, regardless of the fractional part. For positive numbers, any fractional value causes the result to increase (e.g., 1.1 becomes 2, 1.9 becomes 2). For negative numbers, it rounds towards zero (e.g., -1.9 becomes -1).

## Usage

Pass this function as the last argument to [`multiply`](/api/mutations/multiply), [`allocate`](/api/mutations/allocate), or [`transformScale`](/api/conversions/transform-scale) to control how remainders are handled.

## Code examples

### Use with multiply

```js
import { dinero, multiply, up } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 401, currency: USD });

multiply(d, { amount: 21, scale: 1 }, up); // a Dinero object with amount 8422 and scale 3
```

### Use with transformScale

```js
import { dinero, transformScale, up } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 10455, currency: USD, scale: 3 });

transformScale(d, 2, up); // a Dinero object with amount 1046 and scale 2
```
