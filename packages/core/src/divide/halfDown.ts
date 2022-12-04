import type { DivideOperation } from '..';
import { isHalf } from '../utils';

import { down, halfUp } from '.';

export const halfDown: DivideOperation = (amount, factor, calculator) => {
  const isHalfFn = isHalf(calculator);

  if (isHalfFn(amount, factor)) {
    return down(amount, factor, calculator);
  }

  return halfUp(amount, factor, calculator);
};
