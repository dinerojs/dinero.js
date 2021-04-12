/* eslint-disable functional/no-let, functional/no-loop-statement, functional/immutable-data, functional/no-expression-statement */
import type { Calculator } from '@dinero.js/calculator';
import { equal } from '.';

type DistributeCalculator<TAmount> = Pick<
  Calculator<TAmount>,
  'add' | 'compare' | 'divide' | 'increment' | 'multiply' | 'subtract' | 'zero' | 'modulo'
>;

/**
 * Returns a distribute function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The distribute function.
 */
export function distribute<TAmount>(
  calculator: DistributeCalculator<TAmount>,
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
      const rawQuotient = calculator.divide(calculator.multiply(value, ratio), total);
      const share = calculator.subtract(rawQuotient, calculator.modulo(rawQuotient, one)) || zero;

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
