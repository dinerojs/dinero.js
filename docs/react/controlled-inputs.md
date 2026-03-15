---
title: React — Controlled inputs
description: Use the value prop to control the money input externally for form library integration and form reset.
---

# Controlled inputs

By default, `CurrencyInput` and `useCurrencyInput` manage their own state. You can pass the `value` prop to control the input externally, which is useful for form library integration, form reset, or any scenario where the amount is owned by a parent component.

## Controlled vs. uncontrolled

This follows the same pattern as React's native `<input>`:

- **Uncontrolled** (default): the hook manages the amount internally. Use `defaultValue` to set the initial value.
- **Controlled**: you own the state. Pass `value` and wire `onValueChange` back to your state setter.

```tsx
import { useState } from 'react';
import { toSnapshot } from 'dinero.js';
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceField() {
  const [amount, setAmount] = useState(0);

  return (
    <CurrencyInput
      currency={USD}
      format={{ locale: 'en-US' }}
      value={amount}
      onValueChange={(dinero) => {
        setAmount(toSnapshot(dinero).amount);
      }}
    />
  );
}
```

::: warning
When `value` is provided, you **must** wire `onValueChange` back to the state that feeds `value`. Otherwise, keystrokes are ignored and the input becomes read-only. This is the standard React controlled input contract.
:::

## Form reset

Uncontrolled `CurrencyInput` supports native form reset out of the box.

Clicking a [`reset` button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/reset) calling the [`reset` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset) on the parent form resets the input to `defaultValue` (or zero).

```tsx
import { CurrencyInput } from '@dinerojs/react';
import { USD } from 'dinero.js/currencies';

function PriceForm() {
  return (
    <form>
      <CurrencyInput
        currency={USD}
        format={{ locale: 'en-US' }}
        defaultValue={1050}
      />
      <button type="reset">Reset</button>
    </form>
  );
}
```

For controlled inputs, you own the state, so you own the reset.

Reset the state with the desired value for the input to reflect the change.

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
        format={{ locale: 'en-US' }}
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
