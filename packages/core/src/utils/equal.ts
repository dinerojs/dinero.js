import { ComparisonOperator } from '../types';
import type { Calculator } from '../types';

type EqualCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns an equal function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The equal function.
 */
export function equal<TAmount>(
  calculator: EqualCalculator<TAmount>
): (subject: TAmount, comparator: TAmount) => boolean {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.EQ;
  };
}
