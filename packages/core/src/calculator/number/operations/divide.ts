import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the quotient of a set of numbers.
 */
const divide: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc / curr, 0);
};

export default divide;
