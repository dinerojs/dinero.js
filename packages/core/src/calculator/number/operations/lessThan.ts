import { BinaryBooleanOperation } from '@dinero.js/core';

/**
 * Check whether a number is less than another.
 *
 * @param subject The subject to compare.
 * @param comparator The comparator to compare the subject to.
 *
 * @returns Whether the number is less than the other.
 */
const lessThan: BinaryBooleanOperation<number> = (subject, comparator) => {
  return subject < comparator;
};

export default lessThan;
