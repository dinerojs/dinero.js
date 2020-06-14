import { BinaryBooleanOperation } from '@dinero.js/core';

/**
 * Check whether a bigint is less than or equal to another.
 *
 * @param subject The subject to compare.
 * @param comparator The comparator to compare the subject to.
 *
 * @returns Whether the bigint is less than or equal to the other.
 */
const lessThanOrEqual: BinaryBooleanOperation<bigint> = (
  subject,
  comparator
) => {
  return subject <= comparator;
};

export default lessThanOrEqual;
