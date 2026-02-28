---
title: BigInt Dinero Objects Require a Custom JSON Replacer
impact: HIGH
impactDescription: prevents TypeError when serializing bigint Dinero objects
tags: serialization, bigint, json, stringify, replacer
---

## BigInt Dinero Objects Require a Custom JSON Replacer

`JSON.stringify` throws a `TypeError` on bigint values. When using the bigint calculator, provide a custom replacer.

**Incorrect (stringify without replacer):**

```js
import { dinero, toSnapshot } from 'dinero.js/bigint';
import { USD } from 'dinero.js/bigint/currencies';

const price = dinero({ amount: 500n, currency: USD });
JSON.stringify(toSnapshot(price)); // TypeError: Do not know how to serialize a BigInt
```

**Correct (with replacer):**

```js
import { dinero, toSnapshot } from 'dinero.js/bigint';
import { USD } from 'dinero.js/bigint/currencies';

const price = dinero({ amount: 500n, currency: USD });

JSON.stringify(toSnapshot(price), (key, value) => {
  if (typeof value === 'bigint') {
    return String(value);
  }
  return value;
});
```

When restoring, convert string values back to bigint:

```js
const data = JSON.parse(json, (key, value) => {
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return BigInt(value);
  }
  return value;
});
const restored = dinero(data.price);
```

Reference: https://v2.dinerojs.com/guides/transporting-and-restoring
