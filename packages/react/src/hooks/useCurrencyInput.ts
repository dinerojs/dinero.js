import type { Dinero, DineroCurrency, DineroCalculator } from 'dinero.js';
import { DineroComparisonOperator, toDecimal, toSnapshot } from 'dinero.js';
import { useCallback, useState, useMemo } from 'react';
import type {
  InputHTMLAttributes,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';

/**
 * Object shape: delegates to `Intl.NumberFormat` under the hood.
 * The `locale` field is required; all other `Intl.NumberFormatOptions` are forwarded.
 */
export type FormatObject = { locale: string } & Intl.NumberFormatOptions;

/**
 * Function shape: full control over how the decimal value is displayed.
 * Receives the decimal string, currency, and scale so the caller can
 * build any representation (e.g., currency symbols, custom grouping).
 */
export type FormatFunction<TAmount> = (snapshot: {
  value: string;
  currency: DineroCurrency<TAmount>;
  scale: TAmount;
}) => string;

export type UseCurrencyInputOptions<TAmount> = {
  /**
   * How to format the displayed value.
   *
   * - **Object** `{ locale, ...intlOptions }`: uses `Intl.NumberFormat` internally.
   * - **Function** `({ value, currency, scale }) => string`: full control.
   */
  format: FormatObject | FormatFunction<TAmount>;
  /**
   * The initial value as a Dinero object.
   * Used for uncontrolled inputs.
   */
  defaultValue?: Dinero<TAmount>;
  /**
   * The controlled value as a Dinero object.
   * When provided, the hook uses this instead of its internal state.
   * Use with `onValueChange` to implement controlled inputs.
   */
  value?: Dinero<TAmount>;
  /**
   * Called with the current Dinero object whenever the user changes the input value.
   */
  onValueChange?(dinero: Dinero<TAmount>): void;
};

export type UseCurrencyInputReturn<TAmount> = {
  /**
   * Props to spread onto an `<input>` element.
   * Includes `value`, `onChange`, `onKeyDown`, `onPaste`, `type`, and `inputMode`.
   */
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  /**
   * The current value as a Dinero object.
   */
  dineroValue: Dinero<TAmount>;
  /**
   * Resets the internal amount to `defaultValue`.
   * Only affects uncontrolled inputs.
   */
  reset(): void;
};

const NON_DIGIT = /\D/g;

export function useCurrencyInput<TAmount>(
  options: UseCurrencyInputOptions<TAmount>
): UseCurrencyInputReturn<TAmount> {
  const {
    format,
    defaultValue: defaultDinero,
    value: controlledDinero,
    onValueChange,
  } = options;

  const isControlled = controlledDinero !== undefined;

  if (__DEV__) {
    if (controlledDinero !== undefined && defaultDinero !== undefined) {
      console.warn(
        '[Dinero.js] A component has both `value` and `defaultValue` props. ' +
          'When `value` is provided, `defaultValue` is ignored. ' +
          'Decide between a controlled or uncontrolled input and remove one of these props.'
      );
    }
  }

  const sourceDinero = controlledDinero ?? defaultDinero;
  const { amount: sourceAmount, currency, scale } = toSnapshot(sourceDinero!);

  const { calculator, formatter, create } = sourceDinero!;

  const zero = calculator.zero();
  const base = Array.isArray(currency.base) ? currency.base[0] : currency.base;

  const [internalAmount, setInternalAmount] = useState<TAmount>(sourceAmount);

  const amount = isControlled ? sourceAmount : internalAmount;

  const dineroValue = useMemo(
    () => create({ amount, currency, scale }),
    [amount, currency, scale]
  );

  const value = useMemo(
    () =>
      formatDinero(
        dineroValue,
        format,
        currency,
        scale,
        formatter.toNumber(scale)
      ),
    [dineroValue, format, currency, scale, formatter]
  );

  function updateAmount(newAmount: TAmount) {
    if (!isControlled) {
      setInternalAmount(newAmount);
    }

    const newDinero = create({ amount: newAmount, currency, scale });
    onValueChange?.(newDinero);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(NON_DIGIT, '');

    if (digits.length === 0) {
      updateAmount(zero);

      return;
    }

    updateAmount(parseDigits(digits, calculator, zero, base));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace') {
      event.preventDefault();

      if (calculator.compare(amount, zero) === DineroComparisonOperator.EQ) {
        return;
      }

      updateAmount(calculator.integerDivide(amount, base));
    }
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    const pastedDigits = pastedText.replace(NON_DIGIT, '');

    if (pastedDigits.length === 0) {
      return;
    }

    const combined = formatter.toString(amount) + pastedDigits;
    updateAmount(parseDigits(combined, calculator, zero, base));
  }

  const defaultAmount = defaultDinero ? toSnapshot(defaultDinero).amount : zero;

  const reset = useCallback(() => {
    if (!isControlled) {
      setInternalAmount(defaultAmount);
    }
  }, [isControlled, defaultAmount]);

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    inputMode: 'decimal',
    type: 'text',
    value,
    onChange,
    onKeyDown,
    onPaste,
  };

  return { inputProps, dineroValue, reset };
}

function parseDigits<TAmount>(
  digits: string,
  calculator: DineroCalculator<TAmount>,
  zero: TAmount,
  base: TAmount
): TAmount {
  let result = zero;

  for (const ch of digits) {
    result = calculator.multiply(result, base);

    let digit = zero;
    const n = ch.charCodeAt(0) - 48; // '0' is 48

    for (let i = 0; i < n; i++) {
      digit = calculator.increment(digit);
    }

    result = calculator.add(result, digit);
  }

  return result;
}

function formatDinero<TAmount>(
  dineroObject: Dinero<TAmount>,
  format: FormatObject | FormatFunction<TAmount>,
  currency: DineroCurrency<TAmount>,
  scale: TAmount,
  scaleAsNumber: number
): string {
  return toDecimal(dineroObject, ({ value }) => {
    if (typeof format === 'function') {
      return format({ value, currency, scale });
    }

    const { locale, ...intlOptions } = format;

    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: scaleAsNumber,
      maximumFractionDigits: scaleAsNumber,
      useGrouping: true,
      ...intlOptions,
      // Intl.NumberFormat.format() accepts strings at runtime (preserving
      // full precision), but TypeScript's lib types only declare number | bigint.
    }).format(value as string & number);
  });
}
