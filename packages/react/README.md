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
| `value` | `TAmount` | Controlled amount in minor units. When provided, the hook uses this instead of internal state. |
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

A thin component wrapper around `useCurrencyInput` for a more declarative API. It forwards a ref and passes through all standard HTML input attributes.

`CurrencyInput` renders a hidden `<input>` that submits the raw minor-unit amount (e.g., `105000`), keeping the visible input for formatted display only. This means forms submit clean integer strings instead of locale-formatted values.

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

It accepts the same options as `useCurrencyInput` (`currency`, `locale`, `defaultValue`, `value`, `scale`, `onValueChange`) plus any `InputHTMLAttributes<HTMLInputElement>` and `ref`.

For bigint support:

```tsx
import { CurrencyInput } from '@dinerojs/react/bigint';
```

For third-party calculators, use `createCurrencyInput` with a custom `dinero` factory:

```tsx
import { createCurrencyInput } from '@dinerojs/react';

const CurrencyInput = createCurrencyInput(myCustomDinero);
```

## Controlled value

Use the `value` prop to control the input externally. This is useful for form library integration and form reset.

Like React's native `<input>`, you must wire `onValueChange` back to the state that feeds `value` — otherwise keystrokes are ignored.

```tsx
import { useState } from 'react';
import { toSnapshot } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const [amount, setAmount] = useState(0);

  return (
    <CurrencyInput
      currency={USD}
      locale="en-US"
      value={amount}
      onValueChange={(dinero) => setAmount(toSnapshot(dinero).amount)}
    />
  );
}
```

## Form libraries

No adapters needed. Use `onValueChange` to push the value into your form library, and `value` to pull it back for controlled behavior like form reset.

### React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { toSnapshot } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { price: 1050 },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <CurrencyInput
            currency={USD}
            locale="en-US"
            value={field.value}
            onValueChange={(dinero) =>
              field.onChange(toSnapshot(dinero).amount)
            }
          />
        )}
      />
      <button type="button" onClick={() => reset()}>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Formik

```tsx
import { Formik, Form, useField } from 'formik';
import { toSnapshot } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField({ name }: { name: string }) {
  const [field, , helpers] = useField<number>(name);

  return (
    <CurrencyInput
      currency={USD}
      locale="en-US"
      name={name}
      value={field.value}
      onValueChange={(dinero) => helpers.setValue(toSnapshot(dinero).amount)}
    />
  );
}

function PriceForm() {
  return (
    <Formik initialValues={{ price: 1050 }} onSubmit={console.log}>
      {({ resetForm }) => (
        <Form>
          <PriceField name="price" />
          <button type="button" onClick={() => resetForm()}>Reset</button>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

### TanStack Form

```tsx
import { useForm } from '@tanstack/react-form';
import { toSnapshot } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  const form = useForm({
    defaultValues: { price: 1050 },
    onSubmit: ({ value }) => console.log(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="price">
        {(field) => (
          <CurrencyInput
            currency={USD}
            locale="en-US"
            value={field.state.value}
            onValueChange={(dinero) =>
              field.handleChange(toSnapshot(dinero).amount)
            }
          />
        )}
      </form.Field>
      <button type="button" onClick={() => form.reset()}>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Form submission

When used inside a `<form>`, `CurrencyInput` submits the raw minor-unit amount as a string. On the server, parse it directly:

```ts
async function createInvoice(formData: FormData) {
  'use server';
  const amount = Number(formData.get('price')); // e.g., 105000
  const price = dinero({ amount, currency: USD });
}
```

If you use the `useCurrencyInput` hook directly, use `dineroValue` with `toSnapshot` to get the amount for a hidden input:

```tsx
const { inputProps, dineroValue } = useCurrencyInput({ currency: USD, locale: 'en-US' });

<input {...inputProps} />
<input type="hidden" name="price" value={toSnapshot(dineroValue).amount} />
```

## Documentation

For full documentation, visit the [online documentation](https://dinerojs.com).
