---
title: Use toDecimal for Display Strings, Not toSnapshot
impact: CRITICAL
impactDescription: prevents displaying raw minor-unit amounts to users
tags: display, toDecimal, toSnapshot, formatting
---

## Use toDecimal for Display Strings, Not toSnapshot

`toDecimal` returns a human-readable decimal string (e.g., `"19.99"`). `toSnapshot` returns the raw internal representation in minor units (e.g., `{ amount: 1999, ... }`). Use the right one for the right job.

**Incorrect (using toSnapshot for display):**

```js
import { dinero, toSnapshot } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1999, currency: USD });
const { amount } = toSnapshot(price);
display.textContent = `$${amount}`; // Shows "$1999" — wrong
```

**Correct (using toDecimal for display):**

```js
import { dinero, toDecimal } from 'dinero.js';
import { USD } from 'dinero.js/currencies';

const price = dinero({ amount: 1999, currency: USD });
toDecimal(price); // "19.99"
```

`toSnapshot` is for serialization (APIs, databases, transport). `toDecimal` is for rendering to users.

Reference: https://v2.dinerojs.com/core-concepts/formatting
