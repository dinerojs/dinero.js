---
title: useCurrencyInput
description: A React hook that wires a native input to a Dinero object with ATM-style digit entry.
---

# useCurrencyInput

A React hook that manages an ATM-style money input. It handles formatting, keystrokes, and paste, and exposes props to spread onto a native `<input>` element.

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

## Options

| Name | Type | Description | Required |
|------|------|-------------|----------|
| `currency` | `DineroCurrency<TAmount>` | The currency to use. Its exponent determines decimal placement (e.g., 2 for USD means two decimal places). | Yes |
| `locale` | `string` | BCP 47 locale tag for formatting (e.g., `'en-US'`). Controls grouping and decimal separators. | Yes |
| `defaultValue` | `TAmount` | Initial amount in minor currency units (e.g., `1050` for $10.50 in USD). Used for uncontrolled inputs. | No |
| `value` | `TAmount` | Controlled amount in minor currency units. When provided, the hook uses this instead of internal state. Must be used with `onValueChange`. | No |
| `scale` | `TAmount` | Custom scale to override the currency's exponent. For example, `3` with USD formats `10545` as `$10.545`. | No |
| `onValueChange` | `(dinero: Dinero<TAmount>) => void` | Called with the current Dinero object on every change. | No |

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `inputProps` | `InputHTMLAttributes<HTMLInputElement>` | Props to spread onto an `<input>` element. Includes `value`, `onChange`, `onKeyDown`, `onPaste`, `type`, and `inputMode`. |
| `dineroValue` | `Dinero<TAmount>` | The current value as a Dinero object. Always defined (defaults to a zero-amount Dinero). |

## Code examples

### Set a default value

```tsx
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

const { inputProps } = useCurrencyInput({
  currency: USD,
  locale: 'en-US',
  defaultValue: 1050, // starts at $10.50
});
```

### Listen for changes

```tsx
import { toSnapshot } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

const { inputProps } = useCurrencyInput({
  currency: USD,
  locale: 'en-US',
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
import { USD } from 'dinero.js/currencies';

const { inputProps } = useCurrencyInput({
  currency: USD,
  locale: 'en-US',
  value: amount,
  onValueChange(dinero) {
    setAmount(toSnapshot(dinero).amount);
  },
});
```

### Custom scale

```tsx
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

const { inputProps } = useCurrencyInput({
  currency: USD,
  locale: 'en-US',
  scale: 3, // three decimal places: $10.545
});
```

### Use with bigint

```tsx
import { useCurrencyInput } from '@dinerojs/react/bigint';
import { USD } from 'dinero.js/bigint/currencies';

const { inputProps } = useCurrencyInput({
  currency: USD,
  locale: 'en-US',
  defaultValue: 1050n,
});
```

### Use with a custom calculator

See [Custom calculators](/react/custom-calculators) for a full setup guide.

```tsx
import { createUseCurrencyInput } from '@dinerojs/react';

const useCurrencyInput = createUseCurrencyInput(myCustomDinero);
```
