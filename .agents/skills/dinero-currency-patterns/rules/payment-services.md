---
title: Map Dinero Objects to Payment Service Formats with Dedicated Helpers
impact: MEDIUM
impactDescription: prevents payment API errors from wrong amount/currency formats
tags: payment, stripe, paypal, square, integration
---

## Map Dinero Objects to Payment Service Formats with Dedicated Helpers

Each payment service expects a different money format. Build dedicated helper functions to convert Dinero objects to the right shape.

**Stripe (minor units, lowercase currency):**

```js
import { toSnapshot } from 'dinero.js';

function toStripeMoney(dineroObject) {
  const { amount, currency } = toSnapshot(dineroObject);

  return {
    amount,
    currency: currency.code.toLowerCase(),
  };
}

// { amount: 1999, currency: 'usd' }
```

**PayPal (decimal string, uppercase currency):**

```js
import { toSnapshot, toDecimal } from 'dinero.js';

function toPaypalMoney(dineroObject) {
  const { currency } = toSnapshot(dineroObject);

  return {
    value: toDecimal(dineroObject),
    currency_code: currency.code,
  };
}

// { value: '19.99', currency_code: 'USD' }
```

**Square (BigInt amount, uppercase currency):**

```js
import { toSnapshot } from 'dinero.js';

function toSquareMoney(dineroObject) {
  const { amount, currency } = toSnapshot(dineroObject);

  return {
    amount: BigInt(amount),
    currency: currency.code,
  };
}

// { amount: 1999n, currency: 'USD' }
```

Keep these helpers in a single module (e.g., `lib/money.js`) so format changes only need updating in one place.

Reference: https://v2.dinerojs.com/guides/integrating-with-payment-services
