import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the remainder of a set of numbers.
 */
const modulo: VariadicOperation<number> = (...values) => {
  return values.reduce((acc, curr) => acc % curr, 0);
};

export default modulo;
