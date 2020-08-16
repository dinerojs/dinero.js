import { Calculator, ComparisonOperator } from '../calculator';

/**
 * Returns a greaterThan function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The greaterThan function.
 */
function greaterThan<TAmount>(
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.GT;
  };
}

export default greaterThan;
