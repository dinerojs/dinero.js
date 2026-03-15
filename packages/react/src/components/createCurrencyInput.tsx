import type { DineroFactory } from 'dinero.js';
import { toSnapshot } from 'dinero.js';
import { useCallback, useEffect, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import { createUseCurrencyInput } from '../hooks/createUseCurrencyInput';
import type { UseCurrencyInputOptions } from '../hooks/createUseCurrencyInput';

export type CurrencyInputProps<TAmount> = UseCurrencyInputOptions<TAmount> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'value'> & {
    ref?: React.Ref<HTMLInputElement>;
  };

export function createCurrencyInput<TAmount>(
  dineroFactory: DineroFactory<TAmount>
) {
  const useCurrencyInput = createUseCurrencyInput(dineroFactory);

  function CurrencyInput({
    format,
    defaultValue,
    value,
    onValueChange,
    ref,
    name,
    ...rest
  }: CurrencyInputProps<TAmount>) {
    const { inputProps, dineroValue, reset } = useCurrencyInput({
      format,
      defaultValue,
      value,
      onValueChange,
    });

    const internalRef = useRef<HTMLInputElement>(null);
    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    useEffect(() => {
      const form = internalRef.current?.form;

      if (!form) {
        return;
      }

      form.addEventListener('reset', reset);

      return () => form.removeEventListener('reset', reset);
    }, [reset]);

    const snapshot = toSnapshot(dineroValue);

    return (
      <>
        <input ref={mergedRef} {...rest} {...inputProps} />
        {name && (
          <>
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
        )}
      </>
    );
  }

  return CurrencyInput;
}
