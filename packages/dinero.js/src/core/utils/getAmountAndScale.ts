import type { ScaledAmount } from '../types';

import { isScaledAmount } from './isScaledAmount';

export function getAmountAndScale<TAmount>(
  value: ScaledAmount<TAmount> | TAmount,
  zero: TAmount
) {
  if (isScaledAmount(value)) {
    return { amount: value.amount, scale: value?.scale ?? zero };
  }

  return { amount: value, scale: zero };
}
