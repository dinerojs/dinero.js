---
title: Currency type safety
description: Catch currency mismatches at compile time with TypeScript.
---

# Currency type safety

If you're using TypeScript, Dinero.js can catch currency mismatches at compile time. When you use the built-in ISO 4217 currencies, operations like `add`, `subtract`, or `equal` will reject Dinero objects of different currencies before your code even runs.

## How it works

Every Dinero object carries a `TCurrency` type parameter that represents its currency code as a string literal type. When you use a built-in currency like `USD`, the Dinero object is typed as `Dinero<number, 'USD'>`. Operations that require the same currency enforce this at the type level.

```ts
import { dinero, add } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const d1 = dinero({ amount: 500, currency: USD }); // Dinero<number, 'USD'>
const d2 = dinero({ amount: 100, currency: USD }); // Dinero<number, 'USD'>
const d3 = dinero({ amount: 100, currency: EUR }); // Dinero<number, 'EUR'>

add(d1, d2); // OK
add(d1, d3); // Type error: 'EUR' is not assignable to 'USD'
```

This applies to all operations that expect the same currency: `add`, `subtract`, `equal`, `compare`, `greaterThan`, `greaterThanOrEqual`, `lessThan`, `lessThanOrEqual`, `minimum`, `maximum`, `haveSameAmount`, and `normalizeScale`.

## Preserved through operations

The currency type is preserved through unary operations. When you `multiply`, `allocate`, `trimScale`, or `transformScale` a Dinero object, the result keeps the same currency type.

```ts
import { dinero, add, multiply, allocate } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const price = dinero({ amount: 1000, currency: USD });

const doubled = multiply(price, 2); // Dinero<number, 'USD'>
add(doubled, price); // OK
add(doubled, dinero({ amount: 100, currency: EUR })); // Type error

const [half1, half2] = allocate(price, [50, 50]); // Dinero<number, 'USD'>[]
add(half1, price); // OK
```

## Currency conversion

When you `convert` a Dinero object, the result takes the type of the target currency.

```ts
import { dinero, add, convert } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const d = dinero({ amount: 500, currency: USD }); // Dinero<number, 'USD'>

const rates = { EUR: { amount: 89, scale: 2 } };
const converted = convert(d, EUR, rates); // Dinero<number, 'EUR'>

add(converted, dinero({ amount: 100, currency: EUR })); // OK
add(converted, d); // Type error: 'USD' is not assignable to 'EUR'
```

## Typed snapshots and formatters

The currency type flows through to snapshots and formatter callbacks.

```ts
import { dinero, toSnapshot, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const d = dinero({ amount: 1050, currency: USD });

const snapshot = toSnapshot(d);
snapshot.currency.code; // type is 'USD', not string

toDecimal(d, ({ currency }) => {
  currency.code; // type is 'USD', not string
  return `${currency.code} ...`;
});
```

## Custom currencies

If you define custom currencies, you can opt into currency type safety by using `as const satisfies`:

```ts
import type { Currency } from 'dinero.js';

const BTC = {
  code: 'BTC',
  base: 10,
  exponent: 8,
} as const satisfies Currency<number, 'BTC'>;
```

The `as const` gives the `code` field the literal type `'BTC'` instead of `string`, and `satisfies` validates the object conforms to the `Currency` shape.

Without `as const`, the currency code is inferred as `string`, and Dinero objects using it won't enforce currency matching. This is intentional: it keeps Dinero.js backward compatible and lets you opt into stricter checking only when you want it.

## Backward compatibility

The `TCurrency` type parameter defaults to `string`. Existing code that doesn't use typed currencies continues to work without changes.

```ts
// These are both Dinero<number, string> — no type enforcement
const currency = { code: 'USD', base: 10, exponent: 2 };
const d1 = dinero({ amount: 500, currency });
const d2 = dinero({ amount: 100, currency });
add(d1, d2); // OK — both are string-typed
```

Runtime currency checks (`haveSameCurrency` assertions) remain active regardless of typing, so JavaScript users and defensive programming patterns still work.
