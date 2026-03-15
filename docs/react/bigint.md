---
title: React — Bigint support
description: Use @dinerojs/react with bigint-based Dinero objects for large amounts or high-precision currencies.
---

# Bigint support

If you work with large amounts or high-precision currencies like cryptocurrencies, you can use `@dinerojs/react` with bigint-based Dinero objects. The `CurrencyInput` component and `useCurrencyInput` hook are generic — they work with any amount type, including `bigint`.

## Usage

Use the same imports from `@dinerojs/react`. The only difference is that you create Dinero objects with `dinero.js/bigint` and use currencies from `dinero.js/bigint/currencies`:

```tsx
import { dinero } from 'dinero.js/bigint';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/bigint/currencies';

function PriceField() {
  const { inputProps } = useCurrencyInput({
    format: { locale: 'en-US' },
    defaultValue: dinero({ amount: 1050n, currency: USD }),
  });

  return <input {...inputProps} />;
}
```

The `CurrencyInput` component works the same way:

```tsx
import { dinero } from 'dinero.js/bigint';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/bigint/currencies';

function PriceField() {
  return (
    <CurrencyInput
      format={{ locale: 'en-US' }}
      defaultValue={dinero({ amount: 1050n, currency: USD })}
    />
  );
}
```

::: warning
**Use bigint currencies with bigint Dinero objects.** Currencies from `dinero.js/currencies` use `number` values for `base` and `exponent`. Always import from `dinero.js/bigint/currencies` when working with `bigint` amounts.
:::

## Controlled inputs with bigint

When using controlled inputs, the `value` prop and `onValueChange` both work with `Dinero<bigint>` objects:

```tsx
import { useState } from 'react';
import { dinero } from 'dinero.js/bigint';
import type { Dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/bigint/currencies';

function PriceField() {
  const [amount, setAmount] = useState<Dinero<bigint>>(
    dinero({ amount: 0n, currency: USD })
  );

  return (
    <CurrencyInput
      format={{ locale: 'en-US' }}
      value={amount}
      onValueChange={setAmount}
    />
  );
}
```

## When to use bigint

See the [Precision and large numbers](/guides/precision-and-large-numbers) guide for a detailed comparison of `number`, `bigint`, and third-party libraries, and when to pick each.
