import { BinaryBooleanOperation } from '../../types';

/**
 * Check whether a bigint is greater than another.
 *
 * @param subject The subject to compare.
 * @param comparator The comparator to compare the subject to.
 *
 * @returns Whether the bigint is greater than the other.
 */
const greaterThan: BinaryBooleanOperation<bigint> = (subject, comparator) => {
  return subject > comparator;
};

export default greaterThan;
