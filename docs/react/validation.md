---
title: React — Validation
description: Validate currency input data on the client and server with Zod and Valibot schemas.
---

# Validation

When you submit a `CurrencyInput` in a form, the hidden fields send raw strings. You need to parse and validate them before restoring a Dinero object on the server.

This guide shows validation patterns with [Zod](https://zod.dev/) and [Valibot](https://valibot.dev/), but the same approach works with any schema library.

## What gets submitted

When `CurrencyInput` has a `name` prop, it renders three hidden inputs using bracket notation:

```html
<input type="hidden" name="price[amount]" value="1050" />
<input type="hidden" name="price[currency]" value="USD" />
<input type="hidden" name="price[scale]" value="2" />
```

These arrive as strings in [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData). You need to:

1. Coerce `amount` and `scale` to numbers.
2. Validate `currency` against known currency codes.
3. Restore the validated data into a Dinero object.

## Server validation

### With Zod

```ts
import { z } from 'zod';
import { dinero } from 'dinero.js';
import * as currencies from 'dinero.js/currencies';

const currencyCodes = Object.keys(currencies) as [string, ...string[]];

const dineroFormSchema = z.object({
  amount: z.coerce.number().int(),
  currency: z.enum(currencyCodes),
  scale: z.coerce.number().int().nonnegative(),
});

function parseDineroFormData(formData: FormData, name: string) {
  const raw = {
    amount: formData.get(`${name}[amount]`),
    currency: formData.get(`${name}[currency]`),
    scale: formData.get(`${name}[scale]`),
  };

  const { amount, currency, scale } = dineroFormSchema.parse(raw);

  return dinero({
    amount,
    currency: currencies[currency as keyof typeof currencies],
    scale,
  });
}
```

Usage in a server action or API route:

```ts
const price = parseDineroFormData(formData, 'price');
// price is a Dinero<number> object, ready to use
```

### With Valibot

```ts
import * as v from 'valibot';
import { dinero } from 'dinero.js';
import * as currencies from 'dinero.js/currencies';

const currencyCodes = Object.keys(currencies) as [string, ...string[]];

const dineroFormSchema = v.object({
  amount: v.pipe(v.string(), v.transform(Number), v.integer()),
  currency: v.picklist(currencyCodes),
  scale: v.pipe(v.string(), v.transform(Number), v.integer(), v.minValue(0)),
});

function parseDineroFormData(formData: FormData, name: string) {
  const raw = {
    amount: formData.get(`${name}[amount]`),
    currency: formData.get(`${name}[currency]`),
    scale: formData.get(`${name}[scale]`),
  };

  const { amount, currency, scale } = v.parse(dineroFormSchema, raw);

  return dinero({
    amount,
    currency: currencies[currency as keyof typeof currencies],
    scale,
  });
}
```

## Validating JSON payloads

If your API receives Dinero snapshots as JSON (e.g., from `toSnapshot`), the shape includes the full currency object:

```json
{
  "amount": 1050,
  "currency": { "code": "USD", "base": 10, "exponent": 2 },
  "scale": 2
}
```

### With Zod

```ts
import { z } from 'zod';
import { dinero } from 'dinero.js';

const dineroSnapshotSchema = z.object({
  amount: z.number().int(),
  currency: z.object({
    code: z.string(),
    base: z.union([z.number(), z.array(z.number())]),
    exponent: z.number(),
  }),
  scale: z.number().int(),
});

const data = dineroSnapshotSchema.parse(req.body.price);
const price = dinero(data);
```

### With Valibot

```ts
import * as v from 'valibot';
import { dinero } from 'dinero.js';

const dineroSnapshotSchema = v.object({
  amount: v.pipe(v.number(), v.integer()),
  currency: v.object({
    code: v.string(),
    base: v.union([v.number(), v.array(v.number())]),
    exponent: v.number(),
  }),
  scale: v.pipe(v.number(), v.integer()),
});

const data = v.parse(dineroSnapshotSchema, req.body.price);
const price = dinero(data);
```

## Client-side validation

Client-side validation is rarely needed for `CurrencyInput` itself since the component only produces valid Dinero objects. However, you may want to validate _business rules_ like minimum or maximum amounts.

### With Zod (React Hook Form)

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { dinero, isPositive, greaterThanOrEqual } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

const zero = dinero({ amount: 0, currency: USD });

const schema = z.object({
  price: z.custom<Dinero<number>>(
    (val) => isPositive(val as Dinero<number>),
    { message: 'Price must be greater than zero' }
  ),
});

function PriceForm() {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { price: zero },
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
      {errors.price && <p>{errors.price.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Without a schema library

You can also validate directly with Dinero.js comparison functions:

```tsx
import { dinero, isPositive, greaterThanOrEqual } from 'dinero.js';
import type { Dinero } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const maxPrice = dinero({ amount: 100000, currency: USD }); // $1,000.00

function validatePrice(price: Dinero<number>) {
  if (!isPositive(price)) {
    return 'Price must be greater than zero';
  }

  if (!greaterThanOrEqual(maxPrice, price)) {
    return 'Price must be $1,000.00 or less';
  }

  return null;
}
```

## Bigint amounts

When using `dinero.js/bigint`, coerce amounts to `BigInt` instead of `Number`:

### With Zod

```ts
import { z } from 'zod';

const dineroBigintFormSchema = z.object({
  amount: z.string().transform((val) => BigInt(val)),
  currency: z.enum(currencyCodes),
  scale: z.string().transform((val) => BigInt(val)),
});
```

### With Valibot

```ts
import * as v from 'valibot';

const dineroBigintFormSchema = v.object({
  amount: v.pipe(v.string(), v.transform((val) => BigInt(val))),
  currency: v.picklist(currencyCodes),
  scale: v.pipe(v.string(), v.transform((val) => BigInt(val))),
});
```
