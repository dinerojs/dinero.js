---
title: React — Bigint support
description: Use @dinerojs/react with bigint-based Dinero objects for large amounts or high-precision currencies.
---

# Bigint support

If you work with large amounts or high-precision currencies like cryptocurrencies, you can use the bigint variant of `@dinerojs/react`. It works identically to the default export but expects `bigint` values for amounts, scales, and default values.

## Usage

Import from `@dinerojs/react/bigint` instead of `@dinerojs/react`:

```tsx
import { useCurrencyInput } from '@dinerojs/react/bigint';
import { USD } from 'dinero.js/bigint/currencies';

function PriceField() {
  const { inputProps } = useCurrencyInput({
    currency: USD,
    format: { locale: 'en-US' },
    defaultValue: 1050n,
  });

  return <input {...inputProps} />;
}
```

The `CurrencyInput` component is also available:

```tsx
import { CurrencyInput } from '@dinerojs/react/bigint';
import { USD } from 'dinero.js/bigint/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
      defaultValue={1050n}
    />
  );
}
```

::: warning
**Use bigint currencies with the bigint variant.** Currencies from `dinero.js/currencies` use `number` values for `base` and `exponent`. Always import from `dinero.js/bigint/currencies` when using `@dinerojs/react/bigint`.
:::

## Controlled inputs with bigint

When using controlled inputs, the `value` prop and the amount extracted from `onValueChange` are both `bigint`:

```tsx
import { useState } from 'react';
import { toSnapshot } from 'dinero.js/bigint';
import { CurrencyInput } from '@dinerojs/react/bigint';
import { USD } from 'dinero.js/bigint/currencies';

function PriceField() {
  const [amount, setAmount] = useState(0n);

  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
      value={amount}
      onValueChange={(dinero) => setAmount(toSnapshot(dinero).amount)}
    />
  );
}
```

## When to use bigint

See the [Precision and large numbers](/guides/precision-and-large-numbers) guide for a detailed comparison of `number`, `bigint`, and third-party libraries, and when to pick each.
