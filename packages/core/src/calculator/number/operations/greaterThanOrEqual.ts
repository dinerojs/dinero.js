import { BinaryBooleanOperation } from '@dinero.js/core';

/**
 * Check whether a number is greater than or equal to another.
 *
 * @param subject The subject to compare.
 * @param comparator The comparator to compare the subject to.
 *
 * @returns Whether the number is greater than or equal to the other.
 */
const greaterThanOrEqual: BinaryBooleanOperation<number> = (
  subject,
  comparator
) => {
  return subject >= comparator;
};

export default greaterThanOrEqual;
