/* eslint-disable functional/no-let, functional/no-loop-statement, functional/immutable-data, functional/no-expression-statement */
import {
  add,
  subtract,
  multiply,
  divide,
  down,
} from '@dinero.js/core/calculator/number';

/**
 * Returns a number in distributed shares.
 *
 * @param value The number to distribute.
 * @param ratios The ratios according which to distribute.
 *
 * @returns The number distributed in shares.
 */
const distribute = (value: number, ratios: readonly number[]) => {
  const total = ratios.reduce((a, b) => add(a, b));

  if (total === 0) {
    return ratios;
  }

  let remainder = value;

  const shares = ratios.map((ratio) => {
    const share = down(divide(multiply(value, ratio), total)) || 0;
    remainder = subtract(remainder, share);

    return share;
  });

  let i = 0;

  while (remainder > 0) {
    if (ratios[i] > 0) {
      shares[i] = add(shares[i], 1);
      remainder = subtract(remainder, 1);
    }

    i++;
  }

  return shares;
};

export default distribute;
