import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the product of a set of bigints.
 */
const multiply: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc * curr, 0n);
};

export default multiply;
