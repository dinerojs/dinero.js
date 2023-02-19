import type { DivideOperation } from '..';
import { equal, greaterThan } from '../utils';

export const up: DivideOperation = (amount, factor, calculator) => {
  const greaterThanFn = greaterThan(calculator);
  const equalFn = equal(calculator);

  const zero = calculator.zero();
  const isPositive = greaterThanFn(amount, zero);
  const quotient = calculator.integerDivide(amount, factor);
  const remainder = calculator.modulo(amount, factor);

  if (!equalFn(remainder, zero) && isPositive) {
    return calculator.increment(quotient);
  }

  return quotient;
};
