import type { RoundingMode } from '..';
import { greaterThanOrEqual } from '../utils';

export const down: RoundingMode = (amount, factor, calculator) => {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

  const zero = calculator.zero();
  const isPositive = greaterThanOrEqualFn(amount, zero);
  const quotient = calculator.integerDivide(amount, factor);

  if (isPositive) {
    return quotient;
  }

  return calculator.decrement(quotient);
};
