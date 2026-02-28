---
title: Use toSnapshot for Transport and Storage, Not Display
impact: HIGH
impactDescription: prevents data loss from using display-oriented functions for serialization
tags: serialization, toSnapshot, transport, storage, json
---

## Use toSnapshot for Transport and Storage, Not Display

`toSnapshot` returns the full internal representation as a plain object, suitable for JSON serialization. Use it for APIs, databases, and transport. Use `toDecimal` for user-facing display.

**Correct (serialization with toSnapshot):**

```js
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1999, currency: USD });
const snapshot = toSnapshot(price);
// { amount: 1999, currency: { code: 'USD', base: 10, exponent: 2 }, scale: 2 }

// Send to API
await fetch('/api/products', {
  method: 'POST',
  body: JSON.stringify({ price: snapshot }),
});
```

**Correct (restoring from snapshot):**

```js
import { dinero } from 'dinero.js';

// The snapshot can be passed directly to dinero()
const restored = dinero(data.price);
```

Snapshots are plain objects with no methods, making them safe for `JSON.stringify`, database columns, and cross-service communication.

Reference: https://v2.dinerojs.com/guides/transporting-and-restoring
