/**
 * Returns whether a value is numeric.
 * @ignore
 *
 * @param  {} value - The value to test.
 *
 * @return {Boolean}
 */
export function isNumeric(value) {
  return !isNaN(parseInt(value)) && isFinite(value)
}
