import { Calculator } from '..';
import { equal, lessThan } from '.';

/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
export function lessThanOrEqual<TAmount>(
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      lessThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}
