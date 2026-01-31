---
title: lessThanOrEqual
description: Check whether the value of a Dinero object is lesser than or equal to another.
returns: boolean
---

# lessThanOrEqual

Check whether the value of a Dinero object is lesser than or equal to another.

**You can only compare objects that share the same currency.** The function also normalizes objects to the same scale (the highest) before comparing them.

## Parameters

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `dineroObject` | `Dinero<TAmount>` | The first Dinero object to compare. | Yes |
| `comparator` | `Dinero<TAmount>` | The second Dinero object to compare. | Yes |

## Code examples

### Compare two objects

```js
import { dinero, lessThanOrEqual } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d1 = dinero({ amount: 800, currency: USD });
const d2 = dinero({ amount: 500, currency: USD });

lessThanOrEqual(d1, d2); // false
```

### Compare two identical objects

```js
import { dinero, lessThanOrEqual } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d1 = dinero({ amount: 500, currency: USD });
const d2 = dinero({ amount: 500, currency: USD });

lessThanOrEqual(d1, d2); // true
```

### Compare two objects after normalization

```js
import { dinero, lessThanOrEqual } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d1 = dinero({ amount: 5000, currency: USD, scale: 3 });
const d2 = dinero({ amount: 800, currency: USD });

lessThanOrEqual(d1, d2); // true
```
