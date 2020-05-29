import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the sum of a set of numbers.
 */
const add: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc + curr, 0);
};

export default add;
