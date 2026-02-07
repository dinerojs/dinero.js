---
title: How to look up a currency by code
description: How to retrieve a currency object from a string code like "USD".
---

# How to look up a currency by code

If you receive currency codes as strings (e.g., from an API or database), you can look up the corresponding currency object using a namespace import.

```ts
import * as currencies from 'dinero.js/currencies';

function getCurrency(code: string) {
  if (!(code in currencies)) {
    throw new Error(`Unknown currency code: ${code}`);
  }

  return currencies[code as keyof typeof currencies];
}
```

Since Dinero.js tracks the latest ISO 4217 standard, currency codes can be added or removed between versions. Always validate codes at runtime, especially if they come from stored data. See [Using built-in currencies](/core-concepts/currency.html#using-built-in-currencies) for more details.

```ts
import { dinero } from 'dinero.js';

const code = 'USD';
const currency = getCurrency(code);
const price = dinero({ amount: 5000, currency });
```

This also works with bigint currencies:

```ts
import * as currencies from 'dinero.js/bigint/currencies';

function getCurrency(code: string) {
  if (!(code in currencies)) {
    throw new Error(`Unknown currency code: ${code}`);
  }

  return currencies[code as keyof typeof currencies];
}
```
