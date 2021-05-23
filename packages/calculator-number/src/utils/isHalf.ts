/**
 * Return whether a number is half.
 *
 * @param value - The number to test.
 *
 * @returns Whether the number is half.
 */
export function isHalf(value: number) {
  return Math.abs(value) % 1 === 0.5;
}
