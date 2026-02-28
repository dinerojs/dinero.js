---
title: Avoid PostgreSQL's money Type for Multi-Currency Applications
impact: HIGH
impactDescription: prevents locale-dependent bugs and precision loss
tags: storage, database, postgresql, money-type
---

## Avoid PostgreSQL's money Type for Multi-Currency Applications

PostgreSQL's `money` type has no currency information, is locale-dependent, and has fixed 2-decimal precision. It fails for currencies with 0 decimals (JPY), 3 decimals (BHD), or multi-currency support.

**Incorrect (PostgreSQL money type):**

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  price MONEY NOT NULL -- No currency info, locale-dependent, fixed precision
);
```

**Correct (separate columns):**

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  price_amount BIGINT NOT NULL,
  price_currency VARCHAR(3) NOT NULL,
  price_scale INTEGER NOT NULL DEFAULT 2
);
```

The same advice applies to other database-specific money types. Use standard integer and string columns for maximum portability and control.

Reference: https://v2.dinerojs.com/guides/storing-in-a-database
