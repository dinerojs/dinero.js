import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the greatest from a set of numbers.
 */
const maximum: VariadicOperation<number> = (...values) => {
  return Math.max(...values);
};

export default maximum;
