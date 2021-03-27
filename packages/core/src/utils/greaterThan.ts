import { Calculator, ComparisonOperator } from '@dinero.js/calculator';

type GreaterThanCalculator<TAmount> = Pick<Calculator<TAmount>, 'compare'>;

/**
 * Returns a greaterThan function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The greaterThan function.
 */
export function greaterThan<TAmount>(
  calculator: GreaterThanCalculator<TAmount>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.GT;
  };
}
