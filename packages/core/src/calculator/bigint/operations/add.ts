import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the sum of a set of bigints.
 */
const add: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc + curr, 0n);
};

export default add;
