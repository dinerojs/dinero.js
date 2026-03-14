import { dinero } from 'dinero.js';
import type { Dinero, DineroCurrency } from 'dinero.js';
import { useState, useMemo } from 'react';
import type {
  InputHTMLAttributes,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';

export type UseCurrencyInputOptions = {
  /**
   * The currency to use for formatting and creating Dinero objects.
   * The currency's exponent determines decimal placement (e.g., 2 for USD).
   */
  currency: DineroCurrency<number>;
  /**
   * The BCP 47 locale tag used to format the displayed value (e.g., grouping and decimal separators).
   */
  locale: string;
  /**
   * The initial amount in minor currency units (e.g., `1050` for $10.50 in USD).
   * Interpreted using the currency's exponent unless `scale` is provided.
   */
  defaultValue?: number;
  /**
   * The scale (number of decimal places) to use instead of the currency's exponent.
   * For example, `scale: 3` with USD formats `10545` as `$10.545`.
   */
  scale?: number;
  /**
   * Called with the current Dinero object whenever the user changes the input value.
   */
  onValueChange?(dinero: Dinero<number>): void;
};

export type UseCurrencyInputReturn = {
  /**
   * Props to spread onto an `<input>` element.
   * Includes `value`, `onChange`, `onKeyDown`, `type`, and `inputMode`.
   */
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  /**
   * The current value as a Dinero object. Always defined (defaults to a zero-amount Dinero).
   */
  dineroValue: Dinero<number>;
};

const NON_DIGIT = /\D/g;

export function useCurrencyInput(
  options: UseCurrencyInputOptions
): UseCurrencyInputReturn {
  const {
    currency,
    locale,
    defaultValue = 0,
    scale: scaleOption,
    onValueChange,
  } = options;
  const [amount, setAmount] = useState(defaultValue);

  const scale = getScale(currency, scaleOption);

  const value = useMemo(
    () => formatAmount(amount, locale, scale),
    [amount, locale, scale]
  );

  const dineroValue = useMemo(
    () => dinero({ amount, currency, scale }),
    [amount, currency, scale]
  );

  function updateAmount(newAmount: number) {
    setAmount(newAmount);
    const newDinero = dinero({ amount: newAmount, currency, scale });
    onValueChange?.(newDinero);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(NON_DIGIT, '');
    const newAmount = parseInt(digits, 10) || 0;
    updateAmount(newAmount);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const newAmount = Math.floor(amount / 10);
      updateAmount(newAmount);
    }
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const pastedDigits = pastedText.replace(NON_DIGIT, '');

    if (pastedDigits.length === 0) return;

    const combined = String(amount) + pastedDigits;
    const newAmount = parseInt(combined, 10) || 0;
    updateAmount(newAmount);
  }

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    inputMode: 'decimal',
    type: 'text',
    value,
    onChange,
    onKeyDown,
    onPaste,
  };

  return { inputProps, dineroValue };
}

function getScale(currency: DineroCurrency<number>, scale?: number): number {
  return scale ?? currency.exponent;
}

function formatAmount(amount: number, locale: string, scale: number): string {
  const divisor = Math.pow(10, scale);
  const value = amount / divisor;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: scale,
    maximumFractionDigits: scale,
    useGrouping: true,
  }).format(value);
}
