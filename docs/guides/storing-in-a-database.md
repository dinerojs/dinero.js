---
title: Storing in a database
description: How to persist Dinero objects in SQL and NoSQL databases.
---

# Storing in a database

When building applications that handle money, you typically need to persist Dinero objects to a database. The way you store them depends on your database system and your application's requirements.

The safest and most portable approach is to **store the amount as an integer in minor units, along with the currency code and exponent.** This works with any database and gives you full control over how data is stored and retrieved.

## Storing amount and currency separately

This approach stores each component of a Dinero object in its own column. It's the most flexible because it doesn't depend on any database-specific features.

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price_amount BIGINT NOT NULL,
  price_currency VARCHAR(3) NOT NULL,
  price_exponent INTEGER NOT NULL DEFAULT 2
);

INSERT INTO products (name, price_amount, price_currency, price_exponent)
VALUES ('Mass Effect: Legendary Edition', 6999, 'EUR', 2);
```

When restoring from the database, you can reconstruct a Dinero object by passing the stored values to the `dinero` function.

```js
import { dinero } from 'dinero.js';

// After fetching from database
const row = {
  name: 'Mass Effect: Legendary Edition',
  price_amount: 6999,
  price_currency: 'EUR',
  price_exponent: 2,
};

const product = {
  name: row.name,
  price: dinero({
    amount: row.price_amount,
    currency: { code: row.price_currency, base: 10, exponent: row.price_exponent },
  }),
};
```

::: tip
If you're working with amounts that have a [custom scale](/core-concepts/scale) different from the currency's exponent, you'll need to store the scale as well and pass it when restoring.
:::

## Storing as JSON

If your database supports JSON columns (PostgreSQL with `JSONB`, MySQL 5.7+, SQLite with JSON1), you can store the entire snapshot as a single value. This simplifies your schema but ties you to databases with JSON support.

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price JSONB NOT NULL
);
```

You can store a snapshot directly and restore it with minimal transformation.

```js
import { dinero, toSnapshot } from 'dinero.js';
import { EUR } from 'dinero.js/currencies';

const price = dinero({ amount: 6999, currency: EUR });

// Insert
await db.query(
  'INSERT INTO products (name, price) VALUES ($1, $2)',
  ['Mass Effect: Legendary Edition', JSON.stringify(toSnapshot(price))]
);

// Restore
const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [1]);

const product = {
  ...rows[0],
  price: dinero(rows[0].price),
};
```

## MongoDB with Decimal128

MongoDB's BSON format includes a `Decimal128` type specifically designed for monetary data. It avoids floating-point precision issues that can occur with regular JavaScript numbers.

For typical use cases where amounts fit within JavaScript's safe integer range, you can store the snapshot directly as an embedded document.

```js
import { dinero, toSnapshot } from 'dinero.js';
import { EUR } from 'dinero.js/currencies';

const price = dinero({ amount: 6999, currency: EUR });

// Insert snapshot as-is
await collection.insertOne({
  name: 'Mass Effect: Legendary Edition',
  price: toSnapshot(price),
});

// Restore
const document = await collection.findOne({ name: 'Mass Effect: Legendary Edition' });
const product = {
  ...document,
  price: dinero(document.price),
};
```

When working with very large amounts or using the [`bigint` calculator](/guides/using-different-amount-types#using-dinero-with-bigint), you should use `Decimal128` for the amount to ensure precision.

```js
import { calculator } from 'dinero.js/bigint';
import { createDinero, toSnapshot } from 'dinero.js';
import { Decimal128 } from 'mongodb';

const dinero = createDinero({ calculator });

const ETH = {
  code: 'ETH',
  base: 10n,
  exponent: 18n,
};

// 1 ETH in wei (10^18)
const balance = dinero({ amount: 1000000000000000000n, currency: ETH });
const snapshot = toSnapshot(balance);

// Insert with Decimal128 for precise amount storage
await collection.insertOne({
  name: 'Wallet balance',
  balance: {
    amount: Decimal128.fromString(String(snapshot.amount)),
    currency: snapshot.currency,
    scale: snapshot.scale,
  },
});

// Restore
const doc = await collection.findOne({ name: 'Wallet balance' });
const wallet = {
  ...doc,
  balance: dinero({
    amount: BigInt(doc.balance.amount.toString()),
    currency: doc.balance.currency,
    scale: doc.balance.scale,
  }),
};
```

## PostgreSQL's money type

PostgreSQL has a built-in `money` type, but it comes with significant limitations that make it unsuitable for most applications:

- **No currency information**: it only stores the amount, not which currency it represents.
- **Locale-dependent**: formatting depends on the `lc_monetary` setting, which can cause issues when moving data between systems.
- **Fixed precision**: always uses 2 decimal places, which doesn't work for currencies like JPY (0 decimals) or BHD (3 decimals).

If you still want to use it for single-currency applications where these limitations don't apply, you can convert Dinero objects to decimal strings for storage.

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price MONEY NOT NULL
);
```

```js
import { dinero, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 6999, currency: USD });

// Insert (convert to decimal string)
await db.query(
  'INSERT INTO products (name, price) VALUES ($1, $2::money)',
  ['Mass Effect: Legendary Edition', toDecimal(price)]
);

// Restore (PostgreSQL returns money as a string like "$69.99")
const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [1]);
const amountString = rows[0].price.replace(/[^0-9.-]/g, ''); // Remove currency symbol
const product = {
  ...rows[0],
  price: dinero({
    amount: Math.round(parseFloat(amountString) * 100),
    currency: USD,
  }),
};
```

::: warning
For most applications, we recommend storing amount and currency separately rather than using the `money` type. This gives you full control over precision and currency handling.
:::
