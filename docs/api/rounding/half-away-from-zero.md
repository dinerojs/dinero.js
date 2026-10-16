---
title: halfAwayFromZero
description: Divide and round half away from zero.
---

# halfAwayFromZero

Divide and round towards the nearest neighbor, rounding away from zero when exactly halfway.

This rounding mode rounds to the nearest integer. When the value is exactly halfway between two integers, it rounds away from zero. Positive halfway values round up (e.g., 1.5 becomes 2), and negative halfway values round down (e.g., -1.5 becomes -2).

This is sometimes referred to as "commercial rounding" or "arithmetic rounding."

## Usage

Pass this function as the last argument to [`transformScale`](/api/conversions/transform-scale) to control how remainders are handled when reducing the scale. `multiply` and `allocate` preserve precision and don't accept a rounding function.

## Code examples

### Use with multiply

```js
import { dinero, multiply, transformScale, halfAwayFromZero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 305, currency: USD });

const product = multiply(d, { amount: 21, scale: 1 });
transformScale(product, 2, halfAwayFromZero); // a Dinero object with amount 641 and scale 2
```

### Use with transformScale

```js
import { dinero, transformScale, halfAwayFromZero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1055, currency: USD, scale: 3 });

transformScale(d, 2, halfAwayFromZero); // a Dinero object with amount 106 and scale 2
```
