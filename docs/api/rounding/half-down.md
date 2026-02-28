---
title: halfDown
description: Divide and round half towards negative infinity.
---

# halfDown

Divide and round towards the nearest neighbor, rounding down when exactly halfway.

This rounding mode rounds to the nearest integer. When the value is exactly halfway between two integers (e.g., 1.5), it rounds down (towards negative infinity). For non-halfway values, it behaves the same as [`halfUp`](/api/rounding/half-up).

For example, 1.5 rounds to 1, 2.5 rounds to 2, and -1.5 rounds to -2.

## Usage

Pass this function as the last argument to [`multiply`](/api/mutations/multiply), [`allocate`](/api/mutations/allocate), or [`transformScale`](/api/conversions/transform-scale) to control how remainders are handled.

## Code examples

### Use with multiply

```js
import { dinero, multiply, halfDown } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 305, currency: USD });

multiply(d, { amount: 21, scale: 1 }, halfDown); // a Dinero object with amount 6405 and scale 3
```

### Use with transformScale

```js
import { dinero, transformScale, halfDown } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1055, currency: USD, scale: 3 });

transformScale(d, 2, halfDown); // a Dinero object with amount 105 and scale 2
```
