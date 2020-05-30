import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the lowest from a set of bigints.
 */
const minimum: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => (acc < curr ? acc : curr), 0n);
};

export default minimum;
