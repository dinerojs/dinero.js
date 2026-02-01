import type { DineroRate, DineroScaledAmount } from '../types';

export function isScaledAmount<TAmount>(
  amount: DineroRate<TAmount>
): amount is DineroScaledAmount<TAmount> {
  return (amount as DineroScaledAmount<TAmount>)?.hasOwnProperty('amount');
}
