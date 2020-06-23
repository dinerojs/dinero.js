import { BinaryBooleanOperation } from '../../types';

/**
 * Check whether a bigint is less than another.
 *
 * @param subject The subject to compare.
 * @param comparator The comparator to compare the subject to.
 *
 * @returns Whether the bigint is less than the other.
 */
const lessThan: BinaryBooleanOperation<bigint> = (subject, comparator) => {
  return subject < comparator;
};

export default lessThan;
