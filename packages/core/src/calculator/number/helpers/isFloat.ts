/**
 * Returns whether a number is a float.
 *
 * @param n The number to test.
 */
function isFloat(n: number) {
  return !Number.isInteger(n) && !Number.isNaN(n) && Number.isFinite(n);
}

export default isFloat;
