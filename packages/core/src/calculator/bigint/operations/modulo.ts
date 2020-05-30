import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the remainder of a set of bigints.
 */
const modulo: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc % curr, 0n);
};

export default modulo;
