---
title: Import Only What You Use — Standalone Functions Enable Tree-Shaking
impact: MEDIUM
impactDescription: reduces bundle size by excluding unused operations
tags: imports, tree-shaking, bundle-size, functions
---

## Import Only What You Use — Standalone Functions Enable Tree-Shaking

Dinero.js exports standalone functions instead of methods on objects. This means bundlers can eliminate unused code. Import only the functions you need.

**How it works:**

```js
// Only add, toDecimal, and dinero are included in your bundle
import { dinero, add, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const total = add(
  dinero({ amount: 1000, currency: USD }),
  dinero({ amount: 500, currency: USD }),
);

toDecimal(total); // "15.00"
```

Functions like `multiply`, `allocate`, `compare`, `greaterThan`, etc. are not shipped if you don't import them.

Note: Dinero.js uses standalone functions, not methods. Write `add(d1, d2)`, not `d1.add(d2)`.

Reference: https://v2.dinerojs.com/faq/why-functions-instead-of-methods
