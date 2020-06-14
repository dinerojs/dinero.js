import { BinaryBooleanOperation } from '@dinero.js/core';

/**
 * Check whether a number is less than or equal to another.
 *
 * @param subject The subject to compare.
 * @param comparator The comparator to compare the subject to.
 *
 * @returns Whether the number is less than or equal to the other.
 */
const lessThanOrEqual: BinaryBooleanOperation<number> = (
  subject,
  comparator
) => {
  return subject <= comparator;
};

export default lessThanOrEqual;
