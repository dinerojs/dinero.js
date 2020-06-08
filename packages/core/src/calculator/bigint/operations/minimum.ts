import { VariadicOperation } from '@dinero.js/core';

/**
 * Returns the lowest from a set of bigints.
 *
 * @param values The bigints to get the lowest from.
 *
 * @returns The lowest bigint.
 */
const minimum: VariadicOperation<bigint> = (values) => {
  return values.reduce((acc, curr) => (acc < curr ? acc : curr));
};

export default minimum;
