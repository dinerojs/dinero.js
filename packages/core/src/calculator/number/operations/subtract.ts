import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the difference between a set of numbers.
 */
const subtract: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc - curr, 0);
};

export default subtract;
