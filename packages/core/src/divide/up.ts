import type { DivideOperation } from '..';
import { greaterThanOrEqual } from '../utils';

export const up: DivideOperation = (amount, factor, calculator) => {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

  const zero = calculator.zero();
  const isPositive = greaterThanOrEqualFn(amount, zero);
  const quotient = calculator.integerDivide(amount, factor);

  if (isPositive) {
    return calculator.increment(quotient);
  }

  return quotient;
};
