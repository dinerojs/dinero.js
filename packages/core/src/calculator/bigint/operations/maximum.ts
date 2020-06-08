import { VariadicOperation } from '@dinero.js/core';

/**
 * Returns the greatest from a set of bigints.
 *
 * @param values The bigints to get the greatest from.
 *
 * @returns The greatest bigint.
 */
const maximum: VariadicOperation<bigint> = (values) => {
  return values.reduce((acc, curr) => (acc > curr ? acc : curr));
};

export default maximum;
