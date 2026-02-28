---
title: Cryptocurrencies Require bigint Due to High Exponents
impact: HIGH
impactDescription: prevents overflow on crypto amounts (e.g., 1 ETH = 10^18 wei)
tags: precision, bigint, cryptocurrency, ethereum, bitcoin
---

## Cryptocurrencies Require bigint Due to High Exponents

Cryptocurrencies like ETH (exponent 18) and BTC (exponent 8) produce amounts that exceed the safe integer range even for small values. Always use the bigint calculator for crypto.

**Incorrect (number calculator for ETH):**

```js
import { dinero } from 'dinero.js';

const ETH = { code: 'ETH', base: 10, exponent: 18 };
// 1 ETH = 1000000000000000000 wei — exceeds Number.MAX_SAFE_INTEGER
const d = dinero({ amount: 1000000000000000000, currency: ETH });
```

**Correct (bigint calculator):**

```js
import { dinero } from 'dinero.js/bigint';

const ETH = { code: 'ETH', base: 10n, exponent: 18n };
const d = dinero({ amount: 1000000000000000000n, currency: ETH });
```

Avoid naming files after cryptocurrency ticker codes (e.g., `xbt.js`, `xmr.js`). Ad blockers may flag these file names as crypto mining scripts and block them from loading.

Reference: https://v2.dinerojs.com/guides/cryptocurrencies
