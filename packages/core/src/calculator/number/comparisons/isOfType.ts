/**
 * Check whether a value is a number and integer.
 *
 * @param value The value to check.
 *
 * @returns Whether the value is a number and integer.
 */
function isOfType(value: number) {
  return Number.isInteger(value);
}

export default isOfType;
