import type { DivideOperation } from '..';
import { absolute, greaterThan, isHalf } from '../utils';

import { down, up } from '.';

export const halfUp: DivideOperation = (amount, factor, calculator) => {
  const greaterThanFn = greaterThan(calculator);
  const isHalfFn = isHalf(calculator);
  const absoluteFn = absolute(calculator);

  const zero = calculator.zero();
  const remainder = absoluteFn(calculator.modulo(amount, factor));
  const difference = calculator.subtract(factor, remainder);
  const isLessThanHalf = greaterThanFn(difference, remainder);
  const isPositive = greaterThanFn(amount, zero);

  // Round up in these three cases:
  // (1) the quotient is half:
  //   e.g. ... -2.5,  -1.5,  -0.5,  0.5,  1.5,  2.5 ...
  // (2) the quotient is positive, and greater than half:
  //   e.g.                          0.51, 1.51, 2.51 ...
  // (3) the quotient is negative, and less than half:
  //   e.g. ... -2.49, -1.49, -0.49

  if (
    isHalfFn(amount, factor) ||
    (isPositive && !isLessThanHalf) ||
    (!isPositive && isLessThanHalf)
  ) {
    return up(amount, factor, calculator);
  }

  return down(amount, factor, calculator);
};
