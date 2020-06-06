import { FunctionalDinero, normalizeScale } from '@dinero.js/fp';

/**
 * Check whether the value of a functional Dinero object is greater than another.
 *
 * @param subject The functional Dinero object to compare.
 * @param comparator The functional Dinero object to compare to.
 *
 * @returns Whether the functional Dinero to compare is greater than the other.
 */
function greaterThan(
  subject: FunctionalDinero<number>,
  comparator: FunctionalDinero<number>
) {
  const comparators = normalizeScale([subject, comparator]);
  const { amount: subjectAmount } = comparators[0].toJSON();
  const { amount: comparatorAmount } = comparators[1].toJSON();

  return subjectAmount > comparatorAmount;
}

export default greaterThan;
