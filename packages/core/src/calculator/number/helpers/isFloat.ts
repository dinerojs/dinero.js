/**
 * Return whether a number is a float.
 *
 * @param value The number to test.
 *
 * @returns Whether the number is a float.
 */
function isFloat(value: number) {
  return !Number.isInteger(value) && !Number.isNaN(value) && Number.isFinite(value);
}

export default isFloat;
