---
title: maximum
description: Get the greatest of the passed Dinero objects.
returns: Dinero<TAmount, TCurrency>
---

# maximum

Get the greatest of the passed Dinero objects.

**You can only compare objects that share the same currency.** The function also normalizes objects to the same scale (the highest) before comparing them.

In TypeScript, this is enforced at compile time when using [typed currencies](/guides/currency-type-safety).

## Parameters

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `dineroObjects` | `Dinero<TAmount, TCurrency>[]` | The Dinero objects to maximum. | Yes |

## Code examples

### Get the greatest object from a set

```js
import { dinero, maximum } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d1 = dinero({ amount: 150, currency: USD });
const d2 = dinero({ amount: 50, currency: USD });

maximum([d1, d2]); // a Dinero object with amount 150
```

### Get the greatest object from a set after normalization

```js
import { dinero, maximum } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

maximum([d1, d2]); // a Dinero object with amount 5000 and scale 3
```
