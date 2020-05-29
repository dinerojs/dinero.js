import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the lowest from a set of numbers.
 */
const minimum: VariadicOperation<number> = (...values) => {
  return Math.min(...values);
};

export default minimum;
