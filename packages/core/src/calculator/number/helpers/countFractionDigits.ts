/**
 * Return how many fraction digits a number has.
 *
 * @param value The number to test.
 *
 * @returns How many fraction digits the number has.
 */
function countFractionDigits(value: number) {
  const stringRepresentation = value.toString();

  if (stringRepresentation.indexOf('e-') > 0) {
    // It's too small for a normal string representation, e.g., 1e-7 instead of 0.00000001
    return Number.parseInt(stringRepresentation.split('e-')[1], 10);
  } else {
    const fractionDigits = stringRepresentation.split('.')[1];

    return fractionDigits ? fractionDigits.length : 0;
  }
}

export default countFractionDigits;
