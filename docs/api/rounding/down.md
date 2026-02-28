---
title: down
description: Divide and round towards negative infinity.
---

# down

Divide and round towards negative infinity.

This rounding mode always rounds down, regardless of the fractional part. For positive numbers, it truncates the decimal (e.g., 1.1 becomes 1, 1.9 becomes 1). For negative numbers, it rounds away from zero (e.g., -1.1 becomes -2).

This is the default rounding mode used by [`transformScale`](/api/conversions/transform-scale).

## Usage

Pass this function as the last argument to [`multiply`](/api/mutations/multiply), [`allocate`](/api/mutations/allocate), or [`transformScale`](/api/conversions/transform-scale) to control how remainders are handled.

## Code examples

### Use with multiply

```js
import { dinero, multiply, down } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 401, currency: USD });

multiply(d, { amount: 21, scale: 1 }, down); // a Dinero object with amount 8421 and scale 3
```

### Use with transformScale

```js
import { dinero, transformScale, down } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 10455, currency: USD, scale: 3 });

transformScale(d, 2, down); // a Dinero object with amount 1045 and scale 2
```
