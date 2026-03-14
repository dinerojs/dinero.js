# @dinerojs/react

> Headless money input components and hooks for React, powered by Dinero.js

**This package provides React bindings for Dinero.js.** It includes a headless `useCurrencyInput` hook, a thin `<CurrencyInput>` component, form library adapters, validation schema helpers, and server-side `FormData` parsing for Next.js and Remix.

## 📦 Install

```sh
npm install @dinerojs/react dinero.js react

# or

yarn add @dinerojs/react dinero.js react
```

## ⚡️ Quick start

Use the `useCurrencyInput` hook to wire a money input to a Dinero object.

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

Or use the `<CurrencyInput>` component for a more declarative API.

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  return (
    <CurrencyInput
      currency={USD}
      locale="en-US"
      onChange={(dineroValue) => {}}
    />
  );
}
```

### Server-side parsing

Parse `FormData` into Dinero objects in Next.js Server Actions or Remix actions.

```tsx
import { parseCurrencyFormData } from '@dinerojs/react/server';
import { USD } from 'dinero.js/currencies';

async function checkout(formData: FormData) {
  const price = parseCurrencyFormData(formData, 'price', USD);
}
```

## 📚 Documentation

For full documentation, visit the [online documentation](https://dinerojs.com).
