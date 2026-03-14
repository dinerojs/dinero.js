import type { DineroFactory } from 'dinero.js';
import { toSnapshot } from 'dinero.js';
import type { InputHTMLAttributes, Ref } from 'react';

import { createUseCurrencyInput } from '../hooks/createUseCurrencyInput';
import type { UseCurrencyInputOptions } from '../hooks/createUseCurrencyInput';

export type CurrencyInputProps<TAmount> = UseCurrencyInputOptions<TAmount> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value'> & {
    ref?: Ref<HTMLInputElement>;
  };

export function createCurrencyInput<TAmount>(
  dineroFactory: DineroFactory<TAmount>
) {
  const useCurrencyInput = createUseCurrencyInput(dineroFactory);

  function CurrencyInput({
    currency,
    format,
    defaultValue,
    value,
    scale,
    onValueChange,
    ref,
    name,
    ...rest
  }: CurrencyInputProps<TAmount>) {
    const { inputProps, dineroValue } = useCurrencyInput({
      currency,
      format,
      defaultValue,
      value,
      scale,
      onValueChange,
    });

    const snapshot = toSnapshot(dineroValue);

    return (
      <>
        <input ref={ref} {...rest} {...inputProps} />
        <input
          type="hidden"
          name={`${name}[amount]`}
          value={`${snapshot.amount}`}
        />
        <input
          type="hidden"
          name={`${name}[currency]`}
          value={snapshot.currency.code}
        />
        <input
          type="hidden"
          name={`${name}[scale]`}
          value={`${snapshot.scale}`}
        />
      </>
    );
  }

  return CurrencyInput;
}
