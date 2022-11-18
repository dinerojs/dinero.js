import type { Calculator } from '../types';

import { equal } from './equal';
import { lessThan } from './lessThan';

export function absolute<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);
  const lessThanFn = lessThan(calculator);
  const zero = calculator.zero();

  return (input: TAmount) => {
    if (equalFn(input, zero)) {
      return zero;
    }

    if (lessThanFn(input, zero)) {
      const minusOne = calculator.decrement(zero);

      return calculator.multiply(minusOne, input);
    }

    return input;
  };
}
