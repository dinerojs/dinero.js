import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the greatest from a set of bigints.
 */
const maximum: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => (acc > curr ? acc : curr), 0n);
};

export default maximum;
