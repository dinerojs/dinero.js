---
title: trimScale
description: Trim a Dinero object's scale as much as possible, down to the currency exponent.
returns: Dinero<TAmount>
---

Trim a Dinero object's scale as much as possible, down to the currency exponent.

## Parameters

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `dineroObject` | `Dinero<TAmount>` | The Dinero object to trim. | Yes |

## Code examples

### Trim an object down to its currency exponent's scale

```js
import { dinero, trimScale } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d = dinero({ amount: 500000, currency: USD, scale: 5 });

trimScale(d); // a Dinero object with amount 500 and scale 2
```

### Trim an object down to the safest possible scale

```js
import { dinero, trimScale } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d = dinero({ amount: 99950, currency: USD, scale: 4 });

trimScale(d); // a Dinero object with amount 9995 and scale 3
```
