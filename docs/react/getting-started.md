---
title: React — Getting started
description: Get started with @dinerojs/react, headless money input components and hooks for React.
---

# Getting started

`@dinerojs/react` provides headless money input primitives for React, powered by Dinero.js. It gives you a [`useCurrencyInput`](/react/api/use-currency-input) hook and a [`CurrencyInput`](/react/api/currency-input) component that handle formatting, keystrokes, and paste.

## Install

```sh
npm install @dinerojs/react dinero.js react
```

::: info
`@dinerojs/react` requires React 19 or later.
:::

## Quick start

Use the `CurrencyInput` component to add a money input. It uses ATM-style entry where digits shift left as the user types—typing "1", "0", "5", "0" with USD produces `$10.50`.

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
      name="price"
      aria-label="Price"
    />
  );
}
```

When you pass a `name` prop, `CurrencyInput` renders hidden inputs for the amount, currency code, and scale using bracket notation (e.g., `price[amount]`, `price[currency]`, `price[scale]`).

For more control, use the [`useCurrencyInput`](/react/api/use-currency-input) hook directly. It returns `inputProps` to spread onto a native `<input>` and a `dineroValue` you can use with any Dinero.js function:

```tsx
import { toDecimal } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const { inputProps, dineroValue } = useCurrencyInput({
    currency: USD,
    format: { locale: 'en-US' },
  });

  const formatted = toDecimal(dineroValue, ({ value, currency }) => {
    return `${currency.code} ${value}`;
  }); // "USD 10.50"

  return <input {...inputProps} />;
}
```

## How it works

The hook formats amounts based on the `format` prop. Pass `{ locale: 'en-US' }` to use `Intl.NumberFormat` with locale-aware grouping and decimal separators, or pass a custom function for full control. The user types raw digits—the hook takes care of placing the decimal point based on the currency's exponent.

| User types | Display (USD, en-US) | Amount (minor units) |
|------------|---------------------|---------------------|
| `1` | `0.01` | `1` |
| `10` | `0.10` | `10` |
| `1050` | `10.50` | `1050` |
| `100000` | `1,000.00` | `100000` |

Backspace removes the last digit, shifting everything right. Pasting works too—only digits are extracted from the pasted text and appended to the current value.

## Setting a default value

Pass `defaultValue` to start the input with a pre-filled amount. The value is in minor currency units, just like when creating a Dinero object.

```tsx
const { inputProps } = useCurrencyInput({
  currency: USD,
  format: { locale: 'en-US' },
  defaultValue: 1050, // starts at $10.50
});
```

## Listening for changes

Use `onValueChange` to react to every change. It receives the current Dinero object.

```tsx
import { toSnapshot } from 'dinero.js';

function PriceField() {
  const { inputProps } = useCurrencyInput({
    currency: USD,
    format: { locale: 'en-US' },
    onValueChange(dinero) {
      const { amount } = toSnapshot(dinero);
      console.log('Amount in cents:', amount);
    },
  });

  return <input {...inputProps} />;
}
```

## Using CurrencyInput

If you prefer a more declarative API, use the [`CurrencyInput`](/react/api/currency-input) component. It renders an `<input>` element, forwards a ref, and passes through all standard HTML input attributes.

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
      className="price-field"
      aria-label="Price"
      onValueChange={(dinero) => console.log(dinero)}
    />
  );
}
```

## Form submission

When you pass a `name` prop, `CurrencyInput` submits the amount, currency code, and scale as separate hidden inputs using bracket notation.

```tsx
<form action="/api/checkout" method="post">
  <CurrencyInput
    currency={USD}
    format={{ locale: 'en-US' }}
    name="price"
    aria-label="Price"
  />
  <button type="submit">Pay</button>
</form>
```

This renders `price[amount]`, `price[currency]`, and `price[scale]` as hidden fields. Frameworks like PHP, Rails, and Express (with `qs`) automatically nest these into an object. In plain `FormData`:

```ts
const amount = Number(formData.get('price[amount]')); // 105000
const currency = formData.get('price[currency]');      // "USD"
const scale = Number(formData.get('price[scale]'));     // 2
```

If you use the `useCurrencyInput` hook directly, you'll need to wire the hidden inputs yourself. See the [hook API reference](/react/api/use-currency-input#in-a-form) for details.

## Next steps

- [Controlled inputs](/react/controlled-inputs) — Wire the input to external state for form library integration and form reset.
- [Form libraries](/react/form-libraries) — Examples with React Hook Form, Formik, and TanStack Form.
- [useCurrencyInput API](/react/api/use-currency-input) — Full options and return value reference.
- [CurrencyInput API](/react/api/currency-input) — Component props reference.
