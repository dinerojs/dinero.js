import type { DivideOperation } from '..';
import { sign, isHalf, absolute } from '../utils';

import { halfUp, down } from '.';

export const halfTowardsZero: DivideOperation = (
  amount,
  factor,
  calculator
) => {
  const signFn = sign(calculator);
  const isHalfFn = isHalf(calculator);
  const absoluteFn = absolute(calculator);

  if (!isHalfFn(amount, factor)) {
    return halfUp(amount, factor, calculator);
  }

  return calculator.multiply(
    signFn(amount),
    down(absoluteFn(amount), factor, calculator)
  );
};
