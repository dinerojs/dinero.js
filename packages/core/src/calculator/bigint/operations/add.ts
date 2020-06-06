import { VariadicOperation } from '@dinero.js/core';

/**
 * Returns the sum of a set of bigints.
 *
 * @param values The bigints to add.
 *
 * @returns The sum of the set of bigints.
 */
const add: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc + curr);
};

export default add;
