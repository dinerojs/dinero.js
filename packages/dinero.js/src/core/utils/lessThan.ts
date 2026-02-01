import { DineroComparisonOperator } from '../types';
import type { DineroCalculator } from '../types';

type LessThanCalculator<TAmount> = DineroCalculator<TAmount>;

/**
 * Returns a lessThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThan function.
 */
export function lessThan<TAmount>(calculator: LessThanCalculator<TAmount>) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      calculator.compare(subject, comparator) === DineroComparisonOperator.LT
    );
  };
}
