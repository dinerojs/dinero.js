import { Calculator, ComparisonOperator } from '../calculator';

/**
 * Returns an equal function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The equal function.
 */
function equal<TAmount>(calculator: Pick<Calculator<TAmount>, 'compare'>) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.EQ;
  };
}

export default equal;
