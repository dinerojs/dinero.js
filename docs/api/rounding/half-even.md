---
title: halfEven
description: Divide and round half to the nearest even integer.
---

# halfEven

Divide and round towards the nearest neighbor, rounding to the nearest even integer when exactly halfway.

This rounding mode is also known as [bankers rounding](https://wiki.c2.com/?BankersRounding). It rounds to the nearest integer, and when the value is exactly halfway between two integers, it picks the even one. This reduces cumulative rounding bias in financial calculations.

For example, 1.5 rounds to 2, 2.5 rounds to 2, 3.5 rounds to 4, and -2.5 rounds to -2.

## Usage

Pass this function as the last argument to [`transformScale`](/api/conversions/transform-scale) to control how remainders are handled when reducing the scale. `multiply` and `allocate` preserve precision and don't accept a rounding function.

## Code examples

### Use with multiply

```js
import { dinero, multiply, transformScale, halfEven } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 305, currency: USD });

const product = multiply(d, { amount: 21, scale: 1 });
transformScale(product, 2, halfEven); // a Dinero object with amount 640 and scale 2
```

### Use with transformScale

```js
import { dinero, transformScale, halfEven } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1045, currency: USD, scale: 3 });

transformScale(d, 2, halfEven); // a Dinero object with amount 104 and scale 2
```
