---
title: halfTowardsZero
description: Divide and round half towards zero.
---

# halfTowardsZero

Divide and round towards the nearest neighbor, rounding towards zero when exactly halfway.

This rounding mode rounds to the nearest integer. When the value is exactly halfway between two integers, it rounds towards zero. Positive halfway values round down (e.g., 1.5 becomes 1), and negative halfway values round up (e.g., -1.5 becomes -1).

## Usage

Pass this function as the last argument to [`multiply`](/api/mutations/multiply), [`allocate`](/api/mutations/allocate), or [`transformScale`](/api/conversions/transform-scale) to control how remainders are handled.

## Code examples

### Use with multiply

```js
import { dinero, multiply, halfTowardsZero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 305, currency: USD });

multiply(d, { amount: 21, scale: 1 }, halfTowardsZero); // a Dinero object with amount 6405 and scale 3
```

### Use with transformScale

```js
import { dinero, transformScale, halfTowardsZero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1055, currency: USD, scale: 3 });

transformScale(d, 2, halfTowardsZero); // a Dinero object with amount 105 and scale 2
```
