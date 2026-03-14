---
title: React — Custom calculators
description: Use @dinerojs/react with third-party calculators like Big.js via the createUseCurrencyInput and createCurrencyInput factories.
---

# Custom calculators

If you use a third-party arithmetic library like [big.js](https://github.com/MikeMcl/big.js), you can create your own `useCurrencyInput` hook and `CurrencyInput` component using the factory functions.

## Creating a custom hook

Use `createUseCurrencyInput` with your custom `dinero` factory:

```tsx
import { createUseCurrencyInput } from '@dinerojs/react';
import { createDinero } from 'dinero.js';
import { calculator, formatter } from './big-calculator';
import { USD } from './big-currencies';

const bigDinero = createDinero({ calculator, formatter });
const useCurrencyInput = createUseCurrencyInput(bigDinero);

function PriceField() {
  const { inputProps } = useCurrencyInput({
    currency: USD,
    format: { locale: 'en-US' },
  });

  return <input {...inputProps} />;
}
```

## Creating a custom component

Use `createCurrencyInput` with the same custom `dinero` factory:

```tsx
import { createCurrencyInput } from '@dinerojs/react';
import { createDinero } from 'dinero.js';
import { calculator, formatter } from './big-calculator';
import { USD } from './big-currencies';

const bigDinero = createDinero({ calculator, formatter });
const CurrencyInput = createCurrencyInput(bigDinero);

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
    />
  );
}
```

## Setting up a calculator

See [Implementing a custom calculator](/guides/precision-and-large-numbers#implementing-a-custom-calculator) for how to build a `DineroCalculator` and `DineroFormatter` for your amount type.
