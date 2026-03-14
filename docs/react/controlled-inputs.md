---
title: React — Controlled inputs
description: Use the value prop to control the money input externally for form library integration and form reset.
---

# Controlled inputs

By default, `useCurrencyInput` manages its own state. Pass the `value` prop to control the input externally—useful for form library integration, form reset, or any scenario where the amount is owned by a parent component.

## Controlled vs. uncontrolled

This follows the same pattern as React's native `<input>`:

- **Uncontrolled** (default): the hook manages the amount internally. Use `defaultValue` to set the initial value.
- **Controlled**: you own the state. Pass `value` and wire `onValueChange` back to your state setter.

```tsx
import { useState } from 'react';
import { toSnapshot } from 'dinero.js';
import { useCurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const [amount, setAmount] = useState(0);

  const { inputProps } = useCurrencyInput({
    currency: USD,
    locale: 'en-US',
    value: amount,
    onValueChange(dinero) {
      setAmount(toSnapshot(dinero).amount);
    },
  });

  return <input {...inputProps} />;
}
```

::: warning
When `value` is provided, you **must** wire `onValueChange` back to the state that feeds `value`. Otherwise, keystrokes are ignored—the input becomes read-only. This is the standard React controlled input contract.
:::

## Form reset

Controlled inputs make form reset straightforward. Reset the state feeding `value` and the input reflects the change immediately.

```tsx
import { useState } from 'react';
import { toSnapshot } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  const [amount, setAmount] = useState(1050);

  return (
    <form>
      <CurrencyInput
        currency={USD}
        locale="en-US"
        value={amount}
        onValueChange={(dinero) => setAmount(toSnapshot(dinero).amount)}
      />
      <button type="button" onClick={() => setAmount(1050)}>
        Reset
      </button>
    </form>
  );
}
```

## Development warnings

In development, the hook warns when:

- **Both `value` and `defaultValue` are provided.** When `value` is set, `defaultValue` is ignored. Pick one.
- **A controlled input becomes uncontrolled** (or vice versa). This usually means `value` changed from defined to `undefined`. Keep the input controlled or uncontrolled for its entire lifetime.

These warnings are removed from production builds.
