import { VariadicOperation } from '@dinero.js/core';

/**
 * Returns the difference between a set of bigints.
 *
 * @param values The bigints to subtract.
 *
 * @returns The difference of the set of bigints.
 */
const subtract: VariadicOperation<bigint> = (...values) => {
  return values.reduce((acc, curr) => acc - curr);
};

export default subtract;
