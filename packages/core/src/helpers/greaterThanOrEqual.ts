import { Calculator } from '../calculator';
import { equal, greaterThan } from '.';

/**
 * Returns a greaterThanOrEqual function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The greaterThanOrEqual function.
 */
function greaterThanOrEqual<TAmount>(
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      greaterThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}

export default greaterThanOrEqual;
