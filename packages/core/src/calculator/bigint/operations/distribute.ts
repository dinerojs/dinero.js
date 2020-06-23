/* eslint-disable functional/no-let, functional/no-loop-statement, functional/immutable-data, functional/no-expression-statement */
import { add, subtract, multiply, divide } from '../../bigint';

/**
 * Returns a bigint in distributed shares.
 *
 * @param value The bigint to distribute.
 * @param ratios The ratios according which to distribute.
 *
 * @returns The bigint distributed in shares.
 */
const distribute = (value: bigint, ratios: ReadonlyArray<bigint>) => {
  const total = ratios.reduce((a, b) => add(a, b), 0n);

  if (total === 0n) {
    return ratios;
  }

  let remainder = value;

  const shares = ratios.map((ratio) => {
    const share = divide(multiply(value, ratio), total) || 0n;
    remainder = subtract(remainder, share);

    return share;
  });

  let i = 0;

  while (remainder > 0) {
    if (ratios[i] !== 0n) {
      shares[i] = add(shares[i], 1n);
      remainder = subtract(remainder, 1n);
    }

    i++;
  }

  return shares;
};

export default distribute;
