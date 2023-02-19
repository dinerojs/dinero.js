import type { DivideOperation } from '..';
import { equal, greaterThanOrEqual } from '../utils';

export const down: DivideOperation = (amount, factor, calculator) => {
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const equalFn = equal(calculator);

  const zero = calculator.zero();
  const isPositive = greaterThanOrEqualFn(amount, zero);
  const quotient = calculator.integerDivide(amount, factor);
  const remainder = calculator.modulo(amount, factor);

  if (isPositive || equalFn(remainder, zero)) {
    return quotient;
  }

  return calculator.decrement(quotient);
};
