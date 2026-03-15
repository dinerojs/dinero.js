---
title: React — Form libraries
description: Integrate @dinerojs/react with React Hook Form, Formik, and TanStack Form.
---

# Form libraries

The `@dinerojs/react` package works with any form library. Use `onValueChange` to push the Dinero object into the form library and `value` to pull it back for controlled behavior like form reset.

The pattern is always the same:
1. Store a Dinero object as the form field's value.
2. Pass it as `value` and wire `onValueChange` to the form library's setter.

## React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { dinero } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { price: dinero({ amount: 1050, currency: USD }) },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="price"
        control={control}
        render={({ field }) => (
          <CurrencyInput
            format={{ locale: 'en-US' }}
            value={field.value}
            onValueChange={field.onChange}
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
import { dinero } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField({ name }: { name: string }) {
  const [field, , helpers] = useField<Dinero<number>>(name);

  return (
    <CurrencyInput
      format={{ locale: 'en-US' }}
      name={name}
      value={field.value}
      onValueChange={(d) => helpers.setValue(d)}
    />
  );
}

function PriceForm() {
  return (
    <Formik
      initialValues={{ price: dinero({ amount: 1050, currency: USD }) }}
      onSubmit={console.log}
    >
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
import { dinero } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  const form = useForm({
    defaultValues: { price: dinero({ amount: 1050, currency: USD }) },
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
            format={{ locale: 'en-US' }}
            value={field.state.value}
            onValueChange={field.handleChange}
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

The same pattern works with any form library that exposes a controlled value and a change handler. Store a Dinero object as the field value and pass it directly to `value` and `onValueChange`.
