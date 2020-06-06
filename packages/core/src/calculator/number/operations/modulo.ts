import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the remainder of a set of numbers.
 *
 * @param values The numbers to divide.
 *
 * @returns The remainder of the set of numbers.
 */
const modulo: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc % curr);
};

export default modulo;
