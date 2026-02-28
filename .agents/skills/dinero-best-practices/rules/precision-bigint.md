---
title: Use bigint for Amounts Exceeding Number.MAX_SAFE_INTEGER
impact: HIGH
impactDescription: prevents silent precision loss on large monetary values
tags: precision, bigint, large-amounts, safe-integer
---

## Use bigint for Amounts Exceeding Number.MAX_SAFE_INTEGER

JavaScript `number` silently loses precision beyond `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991). For large monetary values, use the bigint entry point.

**Incorrect (large amount with number calculator):**

```js
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

// 25800000000000000 exceeds safe integer range — silently wrong
const d = dinero({ amount: 25800000000000000, currency: USD });
```

**Correct (bigint calculator):**

```js
import { dinero } from 'dinero.js/bigint';
import { USD } from 'dinero.js/bigint/currencies';

const d = dinero({ amount: 25800000000000000n, currency: USD });
```

Note: `dinero.js/bigint` uses its own currency definitions where `base` and `exponent` are bigint values. Always import currencies from `dinero.js/bigint/currencies` when using the bigint calculator.

Reference: https://v2.dinerojs.com/guides/precision-and-large-numbers
