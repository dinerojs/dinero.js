---
title: isNegative
description: Check whether a Dinero object is negative.
returns: boolean
---

# isNegative

Check whether a Dinero object is negative.

## Parameters

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `dineroObject` | `Dinero<TAmount>` | The Dinero object to check. | Yes |

## Code examples

### Check a positive object

```js
import { dinero, isNegative } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d = dinero({ amount: 100, currency: USD });

isNegative(d); // false
```

### Check a negative object

```js
import { dinero, isNegative } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d = dinero({ amount: -100, currency: USD });

isNegative(d); // true
```

### Check a zero object

```js
import { dinero, isNegative } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

const d = dinero({ amount: 0, currency: USD });

isNegative(d); // false
```
