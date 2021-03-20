/**
 * Return how many fraction digits a number has.
 *
 * @param value The number to test.
 *
 * @returns How many fraction digits the number has.
 */
export function countFractionDigits(value: number) {
  const asString = value.toString();

  if (asString.indexOf('e-') > 0) {
    // It's too small for a normal string representation
    // e.g., 1e-7 instead of 0.00000001
    const [, exponent] = asString.split('e-');

    return Number.parseInt(exponent, 10);
  }

  const [, fractionDigits] = asString.split('.');

  return fractionDigits?.length || 0;
}
