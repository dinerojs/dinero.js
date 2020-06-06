import { VariadicOperation } from '@dinero.js/core';

/**
 * Returns the remainder of a set of bigints.
 *
 * @param values The bigints to divide.
 *
 * @returns The remainder of the set of bigints.
 */
const modulo: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc % curr);
};

export default modulo;
