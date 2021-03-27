import { Calculator } from '@dinero.js/calculator';
import { equal, lessThan } from '.';

type LessThanOrEqualCalculator<TAmount> = Pick<Calculator<TAmount>, 'compare'>;

/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
export function lessThanOrEqual<TAmount>(
  calculator: LessThanOrEqualCalculator<TAmount>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      lessThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}
