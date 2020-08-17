import { Calculator, ComparisonOperator } from '..';

/**
 * Returns a lessThan function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The lessThan function.
 */
function lessThan<TAmount>(calculator: Pick<Calculator<TAmount>, 'compare'>) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.LT;
  };
}

export default lessThan;
