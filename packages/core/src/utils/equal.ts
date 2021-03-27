import { Calculator, ComparisonOperator } from '@dinero.js/calculator';

type EqualCalculator<TAmount> = Pick<Calculator<TAmount>, 'compare'>;

/**
 * Returns an equal function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The equal function.
 */
export function equal<TAmount>(calculator: EqualCalculator<TAmount>) {
  return (subject: TAmount, comparator: TAmount) => {
    return calculator.compare(subject, comparator) === ComparisonOperator.EQ;
  };
}
