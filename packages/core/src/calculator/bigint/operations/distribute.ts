import {
  add,
  subtract,
  multiply,
  divide,
} from "@dinero.js/core/calculator/bigint";

/**
 * Returns a bigint in distributes shares.
 */
const distribute = (n: bigint, ratios: bigint[]) => {
  const total = ratios.reduce((a, b) => add(a, b));
  let remainder = n;

  const shares = ratios.map((ratio) => {
    const share = divide(multiply(n, ratio), total);
    remainder = subtract(remainder, share);

    return share;
  });

  for (let i = 0; remainder > 0; i++) {
    shares[i] = add(shares[i], 1n);
    remainder = subtract(remainder, 1n);
  }

  return shares;
};

export default distribute;
