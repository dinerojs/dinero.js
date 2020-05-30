import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the quotient of a set of bigints.
 */
const divide: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc / curr, 0n);
};

export default divide;
