/* eslint-disable functional/no-let, functional/no-loop-statement, functional/no-expression-statement */
import type { Calculator } from '../types';

import { equal } from './equal';

type CountTrailingZerosCalculator<TAmount> = Calculator<TAmount>;

export function countTrailingZeros<TAmount>(
  calculator: CountTrailingZerosCalculator<TAmount>
) {
  const equalFn = equal(calculator);
  const zero = calculator.zero();

  return (input: TAmount, base: TAmount) => {
    if (equalFn(zero, input)) {
      return zero;
    }

    let i = zero;
    let temp = input;

    while (equalFn(calculator.modulo(temp, base), zero)) {
      temp = calculator.integerDivide(temp, base);
      i = calculator.increment(i);
    }

    return i;
  };
}
