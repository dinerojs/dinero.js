import type { DineroCalculator } from '../types';

import { equal, absolute } from '.';

export function isHalf<TAmount>(calculator: DineroCalculator<TAmount>) {
  const equalFn = equal(calculator);
  const absoluteFn = absolute(calculator);

  return (input: TAmount, total: TAmount) => {
    const remainder = absoluteFn(calculator.modulo(input, total));
    const difference = calculator.subtract(total, remainder);

    return equalFn(difference, remainder);
  };
}
