import { VariadicOperation } from '@dinero.js/core';

/**
 * Returns the product of a set bigints.
 *
 * @param values The bigints to multiply.
 *
 * @returns The product of the set of bigints.
 */
const multiply: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc * curr);
};

export default multiply;
