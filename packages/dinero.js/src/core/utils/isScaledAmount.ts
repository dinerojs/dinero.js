import type { Rate, DineroScaledAmount } from '../types';

export function isScaledAmount<TAmount>(
  amount: Rate<TAmount>
): amount is DineroScaledAmount<TAmount> {
  return (amount as DineroScaledAmount<TAmount>)?.hasOwnProperty('amount');
}
