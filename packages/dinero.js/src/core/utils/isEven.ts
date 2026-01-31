import type { Calculator } from '../types';

import { equal } from '.';

export function isEven<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);
  const zero = calculator.zero();
  const two = calculator.increment(calculator.increment(zero));

  return (input: TAmount) => {
    return equalFn(calculator.modulo(input, two), zero);
  };
}
