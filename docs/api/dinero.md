---
title: dinero
description: Create a Dinero object.
returns: Dinero<TAmount, TCurrency>
---

# dinero

Create a Dinero object that represents a monetary value.

You specify the amount in [minor currency units](/core-concepts/amount) (e.g., cents for the US dollar) and pass a [currency](/core-concepts/currency). The [scale](/core-concepts/scale) defaults to the currency's exponent but can be set manually for additional precision.

## Parameters

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `amount` | `TAmount` | The amount in minor currency units. Must be an integer. | Yes |
| `currency` | `DineroCurrency<TAmount>` | The currency object. | Yes |
| `scale` | `TAmount` | The number of decimal places to represent. Defaults to the currency exponent. | No |

## Code examples

### Create a Dinero object

```js
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

// This represents $5.00
const d = dinero({ amount: 500, currency: USD });
```

### Create with a custom scale

When you need more precision than the currency exponent provides, you can specify a custom scale.

```js
import { dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

// This represents $0.035 (e.g., the price of a single screw)
const d = dinero({ amount: 35, currency: USD, scale: 3 });
```

### Create with bigint

If you need to work with large amounts that exceed the safe range for `number`, use the bigint variant.

```js
import { dinero } from 'dinero.js/bigint';
import { USD } from 'dinero.js/bigint/currencies';

const d = dinero({ amount: 5000n, currency: USD });
```

### Create with a non-decimal currency

You can use custom currency objects for non-decimal currencies.

```js
import { dinero } from 'dinero.js';

const GBP = {
  code: 'GBP',
  base: [20, 12],
  exponent: 1,
};

// This represents 50 pre-decimal Great Britain pounds
const d = dinero({ amount: 12000, currency: GBP });
```
