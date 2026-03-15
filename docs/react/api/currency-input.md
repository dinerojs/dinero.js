---
title: CurrencyInput
description: A headless money input component for React that wraps useCurrencyInput in a declarative API.
---

# CurrencyInput

A thin component wrapper around [`useCurrencyInput`](/react/api/use-currency-input). It forwards a ref and passes through all standard HTML input attributes.

When a `name` is provided, the component renders hidden `<input>` fields to submit the amount, currency code, and scale. The visible input stays formatted for display only.

```tsx
import { dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      format={{ locale: 'en-US' }}
      defaultValue={dinero({ amount: 0, currency: USD })}
      name="price"
      className="price-field"
    />
  );
}
```

## Props

The `CurrencyInput` component accepts the same options as [`useCurrencyInput`](/react/api/use-currency-input), plus any `InputHTMLAttributes<HTMLInputElement>` and `ref`.

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `format` | `FormatObject \| FormatFunction<TAmount>` | How to format the displayed value. Pass `{ locale: 'en-US' }` or a custom function. | Yes |
| `defaultValue` | `Dinero<TAmount>` | Initial value as a Dinero object. Used for uncontrolled inputs. | No |
| `value` | `Dinero<TAmount>` | Controlled value as a Dinero object. Must be used with `onValueChange`. | No |
| `onValueChange` | `(dinero: Dinero<TAmount>) => void` | Called with the current Dinero object on every change. | No |
| `ref` | `Ref<HTMLInputElement>` | A ref to the underlying `<input>` element. | No |
| `...rest` | `InputHTMLAttributes<HTMLInputElement>` | Any standard HTML input attribute (`className`, `aria-label`, `id`, etc.). | No |

## Code examples

### With HTML attributes

```tsx
import { dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

<CurrencyInput
  format={{ locale: 'en-US' }}
  defaultValue={dinero({ amount: 0, currency: USD })}
  className="price-field"
  name="price"
  id="price"
  aria-label="Price"
  placeholder="Enter price"
/>
```

### With a ref

```tsx
import { useRef } from 'react';
import { dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <CurrencyInput
      ref={inputRef}
      format={{ locale: 'en-US' }}
      defaultValue={dinero({ amount: 0, currency: USD })}
    />
  );
}
```

### Controlled input

See [Controlled inputs](/react/controlled-inputs) for a full explanation of the controlled pattern and form reset.

```tsx
import { CurrencyInput } from '@dinerojs/react';

<CurrencyInput
  format={{ locale: 'en-US' }}
  value={amount}
  onValueChange={setAmount}
/>
```

### With bigint

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

### In a form

When used with a `name` prop, the `CurrencyInput` component submits the amount, currency code, and scale as separate hidden inputs using bracket notation. The visible input stays formatted for the user.

```tsx
import { dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  return (
    <form action="/api/checkout" method="post">
      <CurrencyInput
        format={{ locale: 'en-US' }}
        defaultValue={dinero({ amount: 0, currency: USD })}
        name="price"
      />
      <button type="submit">Pay</button>
    </form>
  );
}
```

This renders three hidden inputs: `price[amount]`, `price[currency]`, and `price[scale]`. On the server:

```ts
const amount = Number(formData.get('price[amount]')); // 105000
const currency = formData.get('price[currency]');      // "USD"
const scale = Number(formData.get('price[scale]'));     // 2
```

Server runtimes and frameworks like PHP, Rails, and Express (with `qs`) automatically nest these into `{ price: { amount, currency, scale } }`.

### Form reset

Uncontrolled `CurrencyInput` supports native form reset. When the form is reset, the input reverts to `defaultValue` (or zero).

```tsx
import { dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  return (
    <form>
      <CurrencyInput
        format={{ locale: 'en-US' }}
        name="price"
        defaultValue={dinero({ amount: 1050, currency: USD })}
      />
      <button type="reset">Reset</button>
    </form>
  );
}
```

For controlled inputs, reset the state that feeds `value`. See [Controlled inputs](/react/controlled-inputs#form-reset) for details.

### With a custom calculator

See [Custom calculators](/react/custom-calculators) for a full setup guide.

```tsx
import { createCurrencyInput } from '@dinerojs/react';

const CurrencyInput = createCurrencyInput(myCustomDinero);
```
