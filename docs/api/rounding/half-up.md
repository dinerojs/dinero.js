---
title: halfUp
description: Divide and round half towards positive infinity.
---

# halfUp

Divide and round towards the nearest neighbor, rounding up when exactly halfway.

This rounding mode rounds to the nearest integer. When the value is exactly halfway between two integers (e.g., 1.5), it rounds up (towards positive infinity). This is the most commonly taught rounding method.

For example, 1.5 rounds to 2, 2.5 rounds to 3, and -1.5 rounds to -1.

## Usage

Pass this function as the last argument to [`transformScale`](/api/conversions/transform-scale) to control how remainders are handled when reducing the scale. `multiply` and `allocate` preserve precision and don't accept a rounding function.

## Code examples

### Use with multiply

```js
import { dinero, multiply, transformScale, halfUp } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 305, currency: USD });

const product = multiply(d, { amount: 21, scale: 1 });
transformScale(product, 2, halfUp); // a Dinero object with amount 641 and scale 2
```

### Use with transformScale

```js
import { dinero, transformScale, halfUp } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1055, currency: USD, scale: 3 });

transformScale(d, 2, halfUp); // a Dinero object with amount 106 and scale 2
```
