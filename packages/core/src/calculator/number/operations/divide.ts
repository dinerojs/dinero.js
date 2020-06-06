import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the quotient of a set of numbers.
 *
 * @param values The numbers to divide.
 *
 * @returns The quotient of the set of numbers.
 */
const divide: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc / curr);
};

export default divide;
