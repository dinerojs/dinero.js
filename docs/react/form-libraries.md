---
title: React — Form libraries
description: Integrate @dinerojs/react with React Hook Form, Formik, and TanStack Form.
---

# Form libraries

The `@dinerojs/react` package works with any form library. Use `onValueChange` to push the value into the form library and `value` to pull it back for controlled behavior like form reset.

The pattern is always the same:
1. Pass the form field's current value as `value`.
2. In `onValueChange`, extract the amount with `toSnapshot` and pass it to the form library's setter.

## React Hook Form

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
            format={{ locale: 'en-US' }}
            value={field.value}
            onValueChange={(dinero) =>
              field.onChange(toSnapshot(dinero).amount)
            }
          />
        )}
      />
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Formik

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
      format={{ locale: 'en-US' }}
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
          <button type="button" onClick={() => resetForm()}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}
```

## TanStack Form

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
            format={{ locale: 'en-US' }}
            value={field.state.value}
            onValueChange={(dinero) =>
              field.handleChange(toSnapshot(dinero).amount)
            }
          />
        )}
      </form.Field>
      <button type="button" onClick={() => form.reset()}>
        Reset
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Other libraries

The same pattern works with any form library that exposes a controlled value and a change handler. Extract the amount from the Dinero object with `toSnapshot` and feed it into whatever state management your library uses.
