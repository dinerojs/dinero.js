---
title: convert
description: Create a Dinero object converter.
returns: Dinero<TAmount, TNewCurrency>
---

# convert

Convert a Dinero object from a currency to another.

If you need to use fractional rates, you shouldn't use floats, but scaled amounts instead. For example, instead of passing `0.89`, you should pass `{ amount: 89, scale: 2 }`. When using scaled amounts, the function converts the returned object to the safest scale.

In TypeScript, the returned Dinero object carries the type of the new currency. See [Currency type safety](/guides/currency-type-safety).

::: warning
Both currencies must share the same base. Converting between currencies with different bases (e.g., USD base 10 and MGA base 5) will throw.
:::

## Parameters

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `dineroObject` | `Dinero<TAmount, TCurrency>` | The Dinero object to convert. | Yes |
| `newCurrency` | `Currency<TAmount, TNewCurrency>` | The currency to convert into. | Yes |
| `rates` | `Rates<TAmount>` | The rates to convert with. | Yes |

## Code examples

### Convert to another currency

```js
import { dinero, convert } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const rates = { EUR: { amount: 89, scale: 2 } };
const d = dinero({ amount: 500, currency: USD });

convert(d, EUR, rates); // a Dinero object with amount 44500 and scale 4
```

### Convert to a currency with a different scale

```js
import { dinero, convert } from 'dinero.js';
import { USD, IQD } from 'dinero.js/currencies';

const rates = { IQD: 1199 };
const d = dinero({ amount: 500, currency: USD });

convert(d, IQD, rates); // a Dinero object with amount 5995000 and scale 3
```

### Build a reusable converter

If you're converting many objects, you might want to reuse the same rates without having to pass them every time. To do so, you can wrap `convert` in a converter function that accepts a Dinero object and a new currency, and returns it formatted using a predefined converter.

```js
import { dinero, convert } from 'dinero.js';
import { USD, EUR } from 'dinero.js/currencies';

const rates = { EUR: { amount: 89, scale: 2 } };

function converter(dineroObject, newCurrency) {
  return convert(dineroObject, newCurrency, rates);
}

const d = dinero({ amount: 500, currency: USD });

converter(d, EUR); // a Dinero object with amount 44500 and scale 4
```

You can even build your own reusable higher-order function to build converters.

```js
// ...

function createConverter(rates) {
  return function converter(dineroObject, newCurrency) {
    return convert(dineroObject, newCurrency, rates);
  };
}
```
