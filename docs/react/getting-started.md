---
title: React — Getting started
description: Get started with @dinerojs/react, headless money input components and hooks for React.
---

# Getting started

The `@dinerojs/react` package provides currency input primitives for React, powered by Dinero.js.

It gives you a [`CurrencyInput`](/react/api/currency-input) component and a [`useCurrencyInput`](/react/api/use-currency-input) hook that handle formatting, keystrokes, and paste. It also returns everything you need when used in a form so you can easily process the data on your server.

## Install the library

First, install `@dinerojs/react` and `dinero.js` in your React project.

```sh
npm install @dinerojs/react dinero.js

# or

yarn install @dinerojs/react dinero.js
```

::: info
`@dinerojs/react` requires React 19 or later.
:::

## Quick start

Use the `CurrencyInput` component to add a currency input. It uses ATM-style entry where digits shift left as the user types. In other words, typing "1", "0", "5", "0" with currency `USD` produces `$10.50`.

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      name="price"
      currency={USD}
      format={{ locale: 'en-US' }}
    />
  );
}
```

The `CurrencyInput` component renders:
- A visible, ATM-style entry for users to safely provide money values.
- Hidden inputs that translate it to the right, serializable values to be sent to a server.

```html
<!-- The human-visible input to type into -->
<input type="text" inputmode="numeric" value="10.50" />

<!-- The hidden fields to submit -->
<input type="hidden" name="price[amount]" value="1050" />
<input type="hidden" name="price[currency]" value="USD" />
<input type="hidden" name="price[scale]" value="2" />
```

::: warning
To properly render the hidden fields, make sure you pass in a `name` prop.
:::

## How it works

The input formats amounts using the `format` prop. You can either pass [options](/react/api/currency-input#props) to use `Intl.NumberFormat` with locale-aware grouping and decimal separators, or pass a custom function for full control.

The user types raw digits. The input takes care of placing the decimal point based on the currency's exponent.

| User types | Display (USD, en-US) | Amount (minor units) |
|------------|---------------------|-----------------------|
| `1`        | `0.01`              | `1`                   |
| `10`       | `0.10`              | `10`                  |
| `1050`.    | `10.50`             | `1050`.               |
| `100000`   | `1,000.00`          | `100000`              |

Backspace removes the last digit, shifting everything to the right. Pasting works as well: only digits are extracted from the pasted text and appended to the current value.

## Setting a default value

You can pass `defaultValue` to start the input with a pre-filled amount. The value is in minor currency units, just like when creating a Dinero object.

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
      defaultValue={1050} // starts at $10.50
    />
  );
}
```

## Listening for changes

You can use `onValueChange` to react to every change. It receives the current Dinero object.

```tsx
import { toSnapshot } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
      onValueChange={(dinero) => {
        const { amount } = toSnapshot(dinero);
        console.log('Amount in cents:', amount);
      }}
    />
  );
}
```

## Form submission

When you pass a `name` prop, `CurrencyInput` renders the amount, currency code, and scale as separate hidden inputs using bracket notation.

```tsx
<form action="/api/checkout" method="post">
  <CurrencyInput
    name="price"
    currency={USD}
    format={{ locale: 'en-US' }}
  />
  <button type="submit">Pay</button>
</form>
```

This renders `price[amount]`, `price[currency]`, and `price[scale]` as hidden fields. Many server runtimes and frameworks like PHP, Ruby on Rails, and Express (via `qs`) automatically nest bracket-notated fields into objects.

You can also retrieve those fields in plain `FormData`:

```ts
const amount = Number(formData.get('price[amount]')); // 105000
const currency = formData.get('price[currency]');      // "USD"
const scale = Number(formData.get('price[scale]'));     // 2
```

If you use the [`useCurrencyInput`](/react/api/use-currency-input) hook directly, you'll need to wire the hidden inputs yourself. See the [hook API reference](/react/api/use-currency-input#in-a-form) for details.
