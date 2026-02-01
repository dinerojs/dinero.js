import { DineroComparisonOperator } from '../types';
import type { DineroCalculator } from '../types';

type GreaterThanCalculator<TAmount> = DineroCalculator<TAmount>;

/**
 * Returns a greaterThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThan function.
 */
export function greaterThan<TAmount>(
  calculator: GreaterThanCalculator<TAmount>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      calculator.compare(subject, comparator) === DineroComparisonOperator.GT
    );
  };
}
