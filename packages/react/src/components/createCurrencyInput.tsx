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
    locale,
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
      locale,
      defaultValue,
      value,
      scale,
      onValueChange,
    });

    return (
      <>
        <input ref={ref} {...rest} {...inputProps} />
        <input
          type="hidden"
          name={name}
          value={`${toSnapshot(dineroValue).amount}`}
        />
      </>
    );
  }

  return CurrencyInput;
}
