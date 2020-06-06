import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the greatest from a set of numbers.
 *
 * @param values The numbers to get the greatest from.
 *
 * @returns The greatest number.
 */
const maximum: VariadicOperation<number> = (...values) => {
  return Math.max(...values);
};

export default maximum;
