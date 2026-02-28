---
title: Currencies with Exponent 0 Take Major Units Directly
impact: HIGH
impactDescription: prevents wrong amounts for JPY, KRW, and similar currencies
tags: creation, exponent, jpy, zero-decimal
---

## Currencies with Exponent 0 Take Major Units Directly

Currencies like JPY and KRW have no minor units (exponent 0). The amount you pass is in major units directly.

**Incorrect (treating JPY like USD):**

```js
import { dinero } from 'dinero.js';
import { JPY } from 'dinero.js/currencies';

// Wrong: this is 500,000 yen, not 5,000 yen
const d = dinero({ amount: 500000, currency: JPY });
```

**Correct (major units for zero-exponent currencies):**

```js
import { dinero } from 'dinero.js';
import { JPY } from 'dinero.js/currencies';

// JPY has exponent 0, so 5000 means 5,000 yen
const d = dinero({ amount: 5000, currency: JPY });
```

Check a currency's `exponent` property to determine the expected unit. USD has exponent 2 (cents), BHD has exponent 3 (fils), JPY has exponent 0 (yen).

Reference: https://v2.dinerojs.com/core-concepts/amount
