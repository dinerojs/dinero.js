import { greaterThanOrEqual as greaterThanOrEqualNumbers } from '@dinero.js/core/calculator/number';
import { FunctionalDinero, normalizeScale, toSnapshot } from '../../..';

/**
 * Check whether the value of a functional Dinero object is greater than or equal to another.
 *
 * @param subject The functional Dinero object to compare.
 * @param comparator The functional Dinero object to compare to.
 *
 * @returns Whether the functional Dinero to compare is greater than or equal to the other.
 */
function greaterThanOrEqual(
  subject: FunctionalDinero<number>,
  comparator: FunctionalDinero<number>
) {
  const comparators = normalizeScale([subject, comparator]);
  const { amount: subjectAmount } = toSnapshot(comparators[0]);
  const { amount: comparatorAmount } = toSnapshot(comparators[1]);

  return greaterThanOrEqualNumbers(subjectAmount, comparatorAmount);
}

export default greaterThanOrEqual;
