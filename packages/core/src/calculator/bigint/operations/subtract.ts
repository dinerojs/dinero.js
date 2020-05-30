import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the difference between a set of bigints.
 */
const subtract: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc - curr, 0n);
};

export default subtract;
