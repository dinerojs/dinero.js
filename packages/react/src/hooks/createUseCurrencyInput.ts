import type {
  Dinero,
  DineroCurrency,
  DineroCalculator,
  DineroFactory,
} from 'dinero.js';
import { DineroComparisonOperator, toDecimal } from 'dinero.js';
import { useState, useMemo, useRef } from 'react';
import type {
  InputHTMLAttributes,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';

export type UseCurrencyInputOptions<TAmount> = {
  /**
   * The currency to use for formatting and creating Dinero objects.
   * The currency's exponent determines decimal placement (e.g., 2 for USD).
   */
  currency: DineroCurrency<TAmount>;
  /**
   * The BCP 47 locale tag used to format the displayed value (e.g., grouping and decimal separators).
   */
  locale: string;
  /**
   * The initial amount in minor currency units (e.g., `1050` for $10.50 in USD).
   * Interpreted using the currency's exponent unless `scale` is provided.
   */
  defaultValue?: TAmount;
  /**
   * The controlled amount in minor currency units.
   * When provided, the hook uses this value instead of its internal state.
   * Use with `onValueChange` to implement controlled inputs (e.g., form library integration).
   */
  value?: TAmount;
  /**
   * The scale (number of decimal places) to use instead of the currency's exponent.
   * For example, `scale: 3` with USD formats `10545` as `$10.545`.
   */
  scale?: TAmount;
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
   * The current value as a Dinero object. Always defined (defaults to a zero-amount Dinero).
   */
  dineroValue: Dinero<TAmount>;
};

const NON_DIGIT = /\D/g;

export function createUseCurrencyInput<TAmount>(
  dineroFactory: DineroFactory<TAmount>
) {
  return function useCurrencyInput(
    options: UseCurrencyInputOptions<TAmount>
  ): UseCurrencyInputReturn<TAmount> {
    const {
      currency,
      locale,
      defaultValue,
      value: controlledValue,
      scale: scaleOption,
      onValueChange,
    } = options;

    const isControlled = controlledValue !== undefined;
    const wasControlledRef = useRef(isControlled);

    if (__DEV__) {
      if (controlledValue !== undefined && defaultValue !== undefined) {
        console.warn(
          '[Dinero.js] A component has both `value` and `defaultValue` props. ' +
            'When `value` is provided, `defaultValue` is ignored. ' +
            'Decide between a controlled or uncontrolled input and remove one of these props.'
        );
      }
    }

    if (__DEV__) {
      if (wasControlledRef.current && !isControlled) {
        console.warn(
          '[Dinero.js] A component is changing a controlled input to be uncontrolled. ' +
            'This is likely caused by the value changing from a defined to an undefined value. ' +
            'Decide between a controlled or uncontrolled input for the lifetime of the component.'
        );
      } else if (!wasControlledRef.current && isControlled) {
        console.warn(
          '[Dinero.js] A component is changing an uncontrolled input to be controlled. ' +
            'This is likely caused by the value changing from undefined to a defined value. ' +
            'Decide between a controlled or uncontrolled input for the lifetime of the component.'
        );
      }
    }

    wasControlledRef.current = isControlled;

    // Create a reference Dinero to access the calculator and formatter.
    const { calculator, formatter } = useMemo(
      () => dineroFactory({ amount: currency.exponent, currency }),
      [currency]
    );

    const zero = calculator.zero();
    const base = Array.isArray(currency.base)
      ? currency.base[0]
      : currency.base;

    const [internalAmount, setInternalAmount] = useState<TAmount>(
      controlledValue ?? defaultValue ?? zero
    );

    const amount = isControlled ? controlledValue : internalAmount;
    const scale = scaleOption ?? currency.exponent;

    const dineroValue = useMemo(
      () => dineroFactory({ amount, currency, scale }),
      [amount, currency, scale]
    );

    const value = useMemo(
      () => formatDinero(dineroValue, locale, formatter.toNumber(scale)),
      [dineroValue, locale, formatter, scale]
    );

    function updateAmount(newAmount: TAmount) {
      if (!isControlled) {
        setInternalAmount(newAmount);
      }
      const newDinero = dineroFactory({ amount: newAmount, currency, scale });
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

    const inputProps: InputHTMLAttributes<HTMLInputElement> = {
      inputMode: 'decimal',
      type: 'text',
      value,
      onChange,
      onKeyDown,
      onPaste,
    };

    return { inputProps, dineroValue };
  };
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
  locale: string,
  scale: number
): string {
  return toDecimal(dineroObject, ({ value }) => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: scale,
      maximumFractionDigits: scale,
      useGrouping: true,
      // Intl.NumberFormat.format() accepts strings at runtime (preserving
      // full precision), but TypeScript's lib types only declare number | bigint.
    }).format(value as string & number);
  });
}
