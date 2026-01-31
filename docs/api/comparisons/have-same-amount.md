---
title: haveSameAmount
description: Check whether a set of Dinero objects have the same amount.
returns: boolean
---

# haveSameAmount

Check whether a set of Dinero objects have the same amount.

## Parameters

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `dineroObjects` | `Dinero<TAmount>[]` | The Dinero object to check. | Yes |

## Code examples

### Compare two objects with the same amount

```js
import { dinero, haveSameAmount } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d1 = dinero({ amount: 1000, currency: USD });
const d2 = dinero({ amount: 1000, currency: USD });

haveSameAmount([d1, d2]); // true
```

### Compare two objects with different amount

```js
import { dinero, haveSameAmount } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d1 = dinero({ amount: 1000, currency: USD });
const d2 = dinero({ amount: 2000, currency: USD });

haveSameAmount([d1, d2]); // false
```

### Compare two objects with the same amount once normalized

```js
import { dinero, haveSameAmount } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d1 = dinero({ amount: 1000, currency: USD });
const d2 = dinero({ amount: 10000, currency: USD, scale: 3 });

haveSameAmount([d1, d2]); // true
```
