import type { Dinero, DineroCurrency } from 'dinero.js';
import type { InputHTMLAttributes } from 'react';

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
  onChange?(dinero: Dinero<number>): void;
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

export function useCurrencyInput(
  _options: UseCurrencyInputOptions
): UseCurrencyInputReturn {
  return {} as UseCurrencyInputReturn;
}
