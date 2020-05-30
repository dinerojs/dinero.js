import {
  add,
  subtract,
  multiply,
  divide,
  down,
} from "@dinero.js/core/calculator/number";

/**
 * Returns a number in distributes shares.
 */
const distribute = (n: number, ratios: number[]) => {
  const total = ratios.reduce((a, b) => add(a, b));
  let remainder = n;

  const shares = ratios.map((ratio) => {
    const share = down(divide(multiply(n, ratio), total));
    remainder = subtract(remainder, share);

    return share;
  });

  for (let i = 0; remainder > 0; i++) {
    shares[i] = add(shares[i], 1);
    remainder = subtract(remainder, 1);
  }

  return shares;
};

export default distribute;
