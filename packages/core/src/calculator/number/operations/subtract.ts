import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the difference between a set of numbers.
 *
 * @param values The numbers to subtract.
 *
 * @returns The difference of the set of numbers.
 */
const subtract: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc - curr);
};

export default subtract;
