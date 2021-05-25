/* eslint-disable functional/no-let, functional/no-loop-statement, functional/no-expression-statement */
import { equal } from './equal';

import type { Calculator } from '../types';

type CountTrailingZerosCalculator<TAmount> = Pick<
  Calculator<TAmount>,
  'compare' | 'integerDivide' | 'increment' | 'zero' | 'modulo'
>;

export function countTrailingZeros<TAmount>(
  calculator: CountTrailingZerosCalculator<TAmount>
) {
  const equalFn = equal(calculator);

  return (input: TAmount, base: TAmount) => {
    const zero = calculator.zero();

    let i = zero;
    let temp = input;

    while (equalFn(calculator.modulo(temp, base), zero)) {
      temp = calculator.integerDivide(temp, base);
      i = calculator.increment(i);
    }

    return i;
  };
}
