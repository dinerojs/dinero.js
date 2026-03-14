# @dinerojs/react

> Headless money input components and hooks for React, powered by Dinero.js

## Install

```sh
npm install @dinerojs/react dinero.js react
```

## Quick start

Use the `useCurrencyInput` hook to wire a money input to a Dinero object. It uses an ATM-style input where digits shift left as the user types (e.g., typing "342" with USD produces `$3.42`).

```tsx
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const { inputProps, dineroValue } = useCurrencyInput({
    currency: USD,
    locale: 'en-US',
  });

  return <input {...inputProps} />;
}
```

### Options

| Option | Type | Description |
|--------|------|-------------|
| `currency` | `DineroCurrency<TAmount>` | The currency to use. Its exponent determines decimal placement. |
| `locale` | `string` | BCP 47 locale tag for formatting (e.g., `'en-US'`). |
| `defaultValue` | `TAmount` | Initial amount in minor units (e.g., `1050` for $10.50). |
| `scale` | `TAmount` | Custom scale to override the currency's exponent. |
| `onValueChange` | `(dinero: Dinero<TAmount>) => void` | Called with the current Dinero object on every change. |

### Return value

| Property | Type | Description |
|----------|------|-------------|
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | Props to spread onto an `<input>` element. |
| `dineroValue` | `Dinero<TAmount>` | The current value as a Dinero object. |

## Bigint support

For bigint-based Dinero objects, import from `@dinerojs/react/bigint`.

```tsx
import { useCurrencyInput } from '@dinerojs/react/bigint';
```

## Custom calculators

For third-party calculators (e.g., Big.js), use `createUseCurrencyInput` with a custom `dinero` factory.

```tsx
import { createUseCurrencyInput } from '@dinerojs/react';

const useCurrencyInput = createUseCurrencyInput(myCustomDinero);
```

## `<CurrencyInput>` component

A thin component wrapper around `useCurrencyInput` for a more declarative API. It renders an `<input>` element, forwards a ref, and passes through all standard HTML input attributes.

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
      onValueChange={(dinero) => console.log(dinero)}
    />
  );
}
```

It accepts the same options as `useCurrencyInput` (`currency`, `locale`, `defaultValue`, `scale`, `onValueChange`) plus any `InputHTMLAttributes<HTMLInputElement>` and `ref`.

For bigint support:

```tsx
import { CurrencyInput } from '@dinerojs/react/bigint';
```

For third-party calculators, use `createCurrencyInput` with a custom `dinero` factory:

```tsx
import { createCurrencyInput } from '@dinerojs/react';

const CurrencyInput = createCurrencyInput(myCustomDinero);
```

## Server-side parsing

_Coming soon._ Parse `FormData` into Dinero objects in Next.js Server Actions and Remix actions via `@dinerojs/react/server`.

## Form library adapters

_Coming soon._ Adapters for React Hook Form, Formik, and other form libraries.

## Validation

_Coming soon._ Schema helpers for Zod, Valibot, and other validation libraries.

## Documentation

For full documentation, visit the [online documentation](https://dinerojs.com).
