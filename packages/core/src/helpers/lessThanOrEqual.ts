import { Calculator } from '../calculator';
import { equal, lessThan } from '.';

/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
function lessThanOrEqual<TAmount>(
  calculator: Pick<Calculator<TAmount>, 'compare'>
) {
  return (subject: TAmount, comparator: TAmount) => {
    return (
      lessThan(calculator)(subject, comparator) ||
      equal(calculator)(subject, comparator)
    );
  };
}

export default lessThanOrEqual;
