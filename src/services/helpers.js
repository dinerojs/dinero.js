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

/**
 * Returns whether a value is even.
 * @ignore
 *
 * @param  {Number} value - The value to test.
 *
 * @return {Boolean}
 */
export function isEven(value) {
  return value % 2 === 0
}
