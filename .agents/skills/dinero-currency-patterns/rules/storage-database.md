---
title: Store Amount, Currency Code, and Scale as Separate Columns
impact: HIGH
impactDescription: prevents data loss and enables correct restoration of Dinero objects
tags: storage, database, schema, columns, restoration
---

## Store Amount, Currency Code, and Scale as Separate Columns

Store each component of a Dinero object separately. This is portable across databases and preserves all information needed for reconstruction.

**Correct (SQL schema):**

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price_amount BIGINT NOT NULL,
  price_currency VARCHAR(3) NOT NULL,
  price_scale INTEGER NOT NULL DEFAULT 2
);
```

**Correct (restoration from database row):**

```js
import { dinero } from 'dinero.js';
import { getCurrency } from './currencies'; // Your validation helper

function dineroFromRow(row) {
  const currency = getCurrency(row.price_currency);

  return dinero({
    amount: row.price_amount,
    currency,
    scale: row.price_scale,
  });
}
```

Always store the `scale`, not just the currency exponent. If a Dinero object was created with a custom scale (e.g., from a `multiply` with a scaled amount), restoring with just the exponent produces the wrong value.

Reference: https://v2.dinerojs.com/guides/storing-in-a-database
