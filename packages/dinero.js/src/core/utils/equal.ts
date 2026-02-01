import { DineroComparisonOperator } from '../types';
import type { DineroCalculator } from '../types';

type EqualCalculator<TAmount> = DineroCalculator<TAmount>;

/**
 * Returns an equal function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The equal function.
 */
export function equal<TAmount>(calculator: EqualCalculator<TAmount>) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      calculator.compare(subject, comparator) === DineroComparisonOperator.EQ
    );
  };
}
