---
title: Validate Currency Codes from External Sources at Runtime
impact: HIGH
impactDescription: prevents undefined currency errors from invalid or unknown codes
tags: types, validation, runtime, lookup, external-input
---

## Validate Currency Codes from External Sources at Runtime

Currency codes from APIs, databases, or user input may be invalid. Always validate before looking up a currency definition.

**Incorrect (direct lookup without validation):**

```ts
import * as currencies from 'dinero.js/currencies';

function createPrice(amount: number, code: string) {
  const currency = currencies[code]; // May be undefined
  return dinero({ amount, currency }); // Runtime error
}
```

**Correct (validate before lookup):**

```ts
import { dinero } from 'dinero.js';
import * as currencies from 'dinero.js/currencies';

function getCurrency(code: string) {
  if (!(code in currencies)) {
    throw new Error(`Unknown currency code: ${code}`);
  }

  return currencies[code as keyof typeof currencies];
}

function createPrice(amount: number, code: string) {
  const currency = getCurrency(code);
  return dinero({ amount, currency });
}
```

Currency codes may also change between Dinero.js versions, as the library tracks ISO 4217 amendments. Pin your package version if you need stability.

Reference: https://v2.dinerojs.com/faq/how-to-look-up-a-currency-by-code
