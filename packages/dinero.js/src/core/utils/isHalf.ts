import type { Calculator } from '../types';

import { equal, absolute } from '.';

export function isHalf<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);
  const absoluteFn = absolute(calculator);

  return (input: TAmount, total: TAmount) => {
    const remainder = absoluteFn(calculator.modulo(input, total));
    const difference = calculator.subtract(total, remainder);

    return equalFn(difference, remainder);
  };
}
