import type { DivideOperation } from '..';
import { greaterThan, isHalf, absolute } from '../utils';

import { down, up } from '.';

export const halfUp: DivideOperation = (amount, factor, calculator) => {
  const greaterThanFn = greaterThan(calculator);
  const isHalfFn = isHalf(calculator);
  const absoluteFn = absolute(calculator);

  const zero = calculator.zero();
  const remainder = absoluteFn(calculator.modulo(amount, factor));
  const difference = calculator.subtract(factor, remainder);
  const isLessThanHalf = greaterThanFn(difference, remainder);
  const isPositive = greaterThanFn(amount, calculator.increment(zero));

  if (
    isHalfFn(amount, factor) ||
    (isLessThanHalf && !isPositive) ||
    (!isLessThanHalf && isPositive)
  ) {
    return up(amount, factor, calculator);
  }

  return down(amount, factor, calculator);
};
