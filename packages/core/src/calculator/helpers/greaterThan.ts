import { Calculator, ComparisonOperator } from '..';

/**
 * Returns a greaterThan function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The greaterThan function.
 */
export function greaterThan<TAmount>(
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.GT;
  };
}
