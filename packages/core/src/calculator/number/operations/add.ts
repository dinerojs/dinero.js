import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the sum of a set of numbers.
 *
 * @param values The numbers to add.
 *
 * @returns The sum of the set of numbers.
 */
const add: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc + curr);
};

export default add;
