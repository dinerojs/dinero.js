/* eslint-disable functional/no-let, functional/no-loop-statement, functional/immutable-data, functional/no-expression-statement */
import type { Calculator, RoundingMode } from '@dinero.js/calculator';
import { equal } from '.';

type DistributeCalculator<TAmount> = Pick<
  Calculator<TAmount>,
  'add' | 'compare' | 'divide' | 'increment' | 'multiply' | 'subtract' | 'zero'
>;

/**
 * Returns a distribute function.
 *
 * @param calculator The calculator to use.
 * @param down A floor function.
 *
 * @returns The distribute function.
 */
export function distribute<TAmount>(
  calculator: DistributeCalculator<TAmount>,
  down: RoundingMode<TAmount> = (value) => value
) {
  return (value: TAmount, ratios: readonly TAmount[]) => {
    const equalFn = equal(calculator);
    const zero = calculator.zero();
    const one = calculator.increment(zero);

    const total = ratios.reduce((a, b) => calculator.add(a, b), zero);

    if (equalFn(total, zero)) {
      return ratios;
    }

    let remainder = value;

    const shares = ratios.map((ratio) => {
      const share =
        down(calculator.divide(calculator.multiply(value, ratio), total)) ||
        zero;

      remainder = calculator.subtract(remainder, share);

      return share;
    });

    let i = 0;

    while (remainder > zero) {
      if (ratios[i] !== zero) {
        shares[i] = calculator.add(shares[i], one);
        remainder = calculator.subtract(remainder, one);
      }

      i++;
    }

    return shares;
  };
}
