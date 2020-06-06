import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the lowest from a set of numbers.
 *
 * @param values The numbers to get the lowest from.
 *
 * @returns The lowest number.
 */
const minimum: VariadicOperation<number> = (...values) => {
  return Math.min(...values);
};

export default minimum;
