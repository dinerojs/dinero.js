---
title: CurrencyInput
description: A headless money input component for React that wraps useCurrencyInput in a declarative API.
---

# CurrencyInput

A thin component wrapper around [`useCurrencyInput`](/react/api/use-currency-input). It renders an `<input>` element, forwards a ref, and passes through all standard HTML input attributes.

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      locale="en-US"
      className="price-field"
      aria-label="Price"
    />
  );
}
```

## Props

`CurrencyInput` accepts the same options as [`useCurrencyInput`](/react/api/use-currency-input) plus any `InputHTMLAttributes<HTMLInputElement>` and `ref`.

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `currency` | `DineroCurrency<TAmount>` | The currency to use. Its exponent determines decimal placement. | Yes |
| `locale` | `string` | BCP 47 locale tag for formatting (e.g., `'en-US'`). | Yes |
| `defaultValue` | `TAmount` | Initial amount in minor currency units. | No |
| `value` | `TAmount` | Controlled amount in minor currency units. Must be used with `onValueChange`. | No |
| `scale` | `TAmount` | Custom scale to override the currency's exponent. | No |
| `onValueChange` | `(dinero: Dinero<TAmount>) => void` | Called with the current Dinero object on every change. | No |
| `ref` | `Ref<HTMLInputElement>` | A ref to the underlying `<input>` element. | No |
| `...rest` | `InputHTMLAttributes<HTMLInputElement>` | Any standard HTML input attribute (`className`, `aria-label`, `id`, etc.). | No |

## Code examples

### With HTML attributes

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

<CurrencyInput
  currency={USD}
  locale="en-US"
  className="price-field"
  id="price"
  aria-label="Price"
  placeholder="Enter price"
/>
```

### With a ref

```tsx
import { useRef } from 'react';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <CurrencyInput
      ref={inputRef}
      currency={USD}
      locale="en-US"
    />
  );
}
```

### Controlled input

See [Controlled inputs](/react/controlled-inputs) for a full explanation of the controlled pattern and form reset.

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

<CurrencyInput
  currency={USD}
  locale="en-US"
  value={amount}
  onValueChange={(dinero) => setAmount(toSnapshot(dinero).amount)}
/>
```

### With bigint

```tsx
import { CurrencyInput } from '@dinerojs/react/bigint';
import { USD } from 'dinero.js/bigint/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      locale="en-US"
      defaultValue={1050n}
    />
  );
}
```

### With a custom calculator

See [Custom calculators](/react/custom-calculators) for a full setup guide.

```tsx
import { createCurrencyInput } from '@dinerojs/react';

const CurrencyInput = createCurrencyInput(myCustomDinero);
```
