---
title: TypeScript Catches Currency Mismatches at Compile Time
impact: HIGH
impactDescription: prevents adding, subtracting, or comparing different currencies
tags: types, currency, mismatch, compile-time, typescript
---

## TypeScript Catches Currency Mismatches at Compile Time

When using typed currencies, TypeScript prevents operations between different currencies. This catches bugs that would otherwise only fail at runtime.

**Caught at compile time:**

```ts
import { dinero, add, subtract, equal } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const price = dinero({ amount: 500, currency: USD }); // Dinero<number, 'USD'>
const tax = dinero({ amount: 100, currency: EUR }); // Dinero<number, 'EUR'>

add(price, tax); // Type error: 'EUR' is not assignable to 'USD'
subtract(price, tax); // Type error
equal(price, tax); // Type error
```

**Currency type preserved through operations:**

```ts
import { dinero, multiply, convert } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const price = dinero({ amount: 500, currency: USD });
const doubled = multiply(price, 2); // Dinero<number, 'USD'> — preserved
const converted = convert(price, EUR, rates); // Dinero<number, 'EUR'> — changed

add(doubled, converted); // Type error: 'EUR' is not assignable to 'USD'
```

Unary operations (`multiply`, `allocate`, `trimScale`) preserve the currency type. `convert` changes it to the target currency.

Reference: https://v2.dinerojs.com/guides/currency-type-safety
