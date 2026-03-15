---
title: useCurrencyInput
description: A React hook that wires a native input to a Dinero object with ATM-style digit entry.
---

# useCurrencyInput

A React hook that manages an ATM-style money input. It handles formatting, keystrokes, and paste, and exposes props to spread onto a native `<input>` element.

```tsx
import { dinero, toSnapshot } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const { inputProps, dineroValue } = useCurrencyInput({
    format: { locale: 'en-US' },
    defaultValue: dinero({ amount: 0, currency: USD }),
  });

  const { amount, currency, scale } = toSnapshot(dineroValue);

  return (
    <>
      <input {...inputProps} />
      <input type="hidden" name="price[amount]" value={`${amount}`} />
      <input type="hidden" name="price[currency]" value={currency.code} />
      <input type="hidden" name="price[scale]" value={`${scale}`} />
    </>
  );
}
```

## Options

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `format` | `FormatObject \| FormatFunction<TAmount>` | How to format the displayed value. Pass `{ locale: 'en-US' }` (with optional `Intl.NumberFormatOptions`) for built-in formatting, or a function `({ value, currency, scale }) => string` for full control. | Yes |
| `defaultValue` | `Dinero<TAmount>` | Initial value as a Dinero object. Used for uncontrolled inputs. | No |
| `value` | `Dinero<TAmount>` | Controlled value as a Dinero object. When provided, the hook uses this instead of internal state. Must be used with `onValueChange`. | No |
| `onValueChange` | `(dinero: Dinero<TAmount>) => void` | Called with the current Dinero object on every change. | No |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | Props to spread onto an `<input>` element. Includes `value`, `onChange`, `onKeyDown`, `onPaste`, `type`, and `inputMode`. |
| `dineroValue` | `Dinero<TAmount>` | The current value as a Dinero object. Always defined (defaults to a zero-amount Dinero). |
| `reset` | `() => void` | Resets the internal amount to `defaultValue` (or zero). Only affects uncontrolled inputs. |

## Code examples

### Set a default value

```tsx
import { dinero } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

const { inputProps, dineroValue } = useCurrencyInput({
  format: { locale: 'en-US' },
  defaultValue: dinero({ amount: 1050, currency: USD }), // starts at $10.50
});
```

### Listen for changes

```tsx
import { dinero, toSnapshot } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

const { inputProps, dineroValue } = useCurrencyInput({
  format: { locale: 'en-US' },
  defaultValue: dinero({ amount: 0, currency: USD }),
  onValueChange(dinero) {
    const { amount } = toSnapshot(dinero);
    console.log('Amount in cents:', amount);
  },
});
```

### Controlled input

See [Controlled inputs](/react/controlled-inputs) for a full explanation of the pattern.

```tsx
import { useCurrencyInput } from '@dinerojs/react';

const { inputProps, dineroValue } = useCurrencyInput({
  format: { locale: 'en-US' },
  value: amount,
  onValueChange: setAmount,
});
```

### Use with bigint

```tsx
import { dinero } from 'dinero.js/bigint';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/bigint/currencies';

const { inputProps, dineroValue } = useCurrencyInput({
  format: { locale: 'en-US' },
  defaultValue: dinero({ amount: 1050n, currency: USD }),
});
```

### Reset

Call `reset()` to restore the input to its `defaultValue` (or zero). This only affects uncontrolled inputs.

```tsx
import { dinero } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const { inputProps, reset } = useCurrencyInput({
    format: { locale: 'en-US' },
    defaultValue: dinero({ amount: 1050, currency: USD }),
  });

  return (
    <>
      <input {...inputProps} />
      <button type="button" onClick={reset}>Reset</button>
    </>
  );
}
```

### In a form

To submit the value in a form, add hidden inputs for the amount, currency, and scale from `dineroValue`. The [`CurrencyInput`](/react/api/currency-input) component handles this automatically.

```tsx
import { dinero, toSnapshot } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const { inputProps, dineroValue } = useCurrencyInput({
    format: { locale: 'en-US' },
    defaultValue: dinero({ amount: 0, currency: USD }),
  });

  const { amount, currency, scale } = toSnapshot(dineroValue);

  return (
    <>
      <input {...inputProps} aria-label="Price" />
      <input type="hidden" name="price[amount]" value={`${amount}`} />
      <input type="hidden" name="price[currency]" value={currency.code} />
      <input type="hidden" name="price[scale]" value={`${scale}`} />
    </>
  );
}
```

### Use with a custom calculator

See [Custom calculators](/react/custom-calculators) for a full setup guide.

```tsx
import { createUseCurrencyInput } from '@dinerojs/react';

const useCurrencyInput = createUseCurrencyInput(myCustomDinero);
```
