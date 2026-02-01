import type { DineroCalculator } from '../types';

import { equal } from '.';

export function isEven<TAmount>(calculator: DineroCalculator<TAmount>) {
  const equalFn = equal(calculator);
  const zero = calculator.zero();
  const two = calculator.increment(calculator.increment(zero));

  return (input: TAmount) => {
    return equalFn(calculator.modulo(input, two), zero);
  };
}
