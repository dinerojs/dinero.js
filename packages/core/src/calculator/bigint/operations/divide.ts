import { VariadicOperation } from "@dinero.js/core";

/**
 * Returns the quotient of a set of bigints.
 *
 * @param values The bigints to divide.
 *
 * @returns The quotient of the set of bigints.
 */
const divide: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc / curr);
};

export default divide;
