import multiply from "./multiply";
import divide from "./divide";

/**
 * Returns the percentage of a bigint.
 */
const percentage = (n: bigint, percentage: bigint) => {
  return divide(multiply(n, percentage), 100n);
};

export default percentage;
