---
title: Use trimScale to Remove Trailing Zeros After Chained Operations
impact: MEDIUM
impactDescription: prevents unnecessary scale growth from chained operations
tags: precision, scale, trim, chained-operations
---

## Use trimScale to Remove Trailing Zeros After Chained Operations

Dinero.js automatically promotes to the highest scale when combining objects with different scales. Over many operations, scale can grow unnecessarily. Use `trimScale` to drop trailing zeros.

**Before trimming:**

```js
import { dinero, add, trimScale } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d1 = dinero({ amount: 100, currency: USD });
const d2 = dinero({ amount: 2000000, currency: USD, scale: 6 });

const result = add(d1, d2); // amount: 3000000, scale: 6
```

**After trimming:**

```js
const trimmed = trimScale(result); // amount: 300, scale: 2
```

This is especially useful before serialization (storing or transporting) where compact representation matters.

Reference: https://v2.dinerojs.com/api/conversions/trim-scale
