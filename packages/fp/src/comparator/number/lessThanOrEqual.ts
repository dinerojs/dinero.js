import { lessThanOrEqual as lessThanOrEqualNumbers } from '@dinero.js/core/calculator/number';
import { FunctionalDinero, normalizeScale, toSnapshot } from '../../..';

/**
 * Check whether the value of a functional Dinero object is lesser than or equal to another.
 *
 * @param subject The functional Dinero object to compare.
 * @param comparator The functional Dinero object to compare to.
 *
 * @returns Whether the functional Dinero to compare is lesser than or equal to the other.
 */
function lessThanOrEqual(
  subject: FunctionalDinero<number>,
  comparator: FunctionalDinero<number>
) {
  const comparators = normalizeScale([subject, comparator]);
  const { amount: subjectAmount } = toSnapshot(comparators[0]);
  const { amount: comparatorAmount } = toSnapshot(comparators[1]);

  return lessThanOrEqualNumbers(subjectAmount, comparatorAmount);
}

export default lessThanOrEqual;
