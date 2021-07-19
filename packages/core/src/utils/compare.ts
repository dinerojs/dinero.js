import type { Calculator } from '../types';

type ComparisonCalculator<TAmount> = Pick<Calculator<TAmount>, 'compare'>;

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
