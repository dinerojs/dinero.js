/**
 * Returns whether a number is half.
 *
 * @param n The number to test.
 */
function isHalf(n: number) {
  return Math.abs(n) % 1 === 0.5;
}

export default isHalf;
