import type { DineroCalculator } from '../types';

type ComparisonCalculator<TAmount> = DineroCalculator<TAmount>;

/**
 * Returns a compare function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The compare function.
 */
export function compare<TAmount>(calculator: ComparisonCalculator<TAmount>) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator);
  };
}
