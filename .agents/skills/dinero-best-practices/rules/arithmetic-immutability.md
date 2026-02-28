---
title: Capture Return Values — Dinero Objects Are Immutable
impact: CRITICAL
impactDescription: prevents silently lost calculations
tags: arithmetic, immutability, pure-functions
---

## Capture Return Values — Dinero Objects Are Immutable

All Dinero.js operations are pure functions that return new objects. The original objects are never modified. Discarding the return value means losing your calculation.

**Incorrect (discarding the return value):**

```js
import { dinero, add } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1000, currency: USD });
const tax = dinero({ amount: 100, currency: USD });

add(price, tax); // Return value discarded — price is unchanged
```

**Correct (capturing the result):**

```js
import { dinero, add } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1000, currency: USD });
const tax = dinero({ amount: 100, currency: USD });

const total = add(price, tax); // $11.00
```

This applies to all operations: `add`, `subtract`, `multiply`, `allocate`, `convert`, `trimScale`, `transformScale`, and `normalizeScale`.

Reference: https://v2.dinerojs.com/core-concepts/mutations
