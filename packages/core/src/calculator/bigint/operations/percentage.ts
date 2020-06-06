import multiply from "./multiply";
import divide from "./divide";

/**
 * Returns the percentage of a bigint.
 *
 * @param value The bigint to calculate a percentage from.
 * @param percentage The percentage to calculate.
 *
 * @returns The percentage of the bigint.
 */
const percentage = (n: bigint, percentage: bigint) => {
  return divide(multiply(n, percentage), 100n);
};

export default percentage;
