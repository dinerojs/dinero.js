import multiply from './multiply';
import divide from './divide';

/**
 * Returns the percentage of a bigint.
 *
 * @param value The bigint to calculate a percentage from.
 * @param share The share to calculate.
 *
 * @returns The percentage of the bigint.
 */
const percentage = (value: bigint, share: bigint) => {
  return divide(multiply(value, share), 100n);
};

export default percentage;
