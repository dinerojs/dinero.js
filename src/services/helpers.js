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

/**
 * Returns whether a value is a float.
 * @ignore
 *
 * @param  {}  value - The value to test.
 *
 * @return {Boolean}
 */
export function isFloat(value) {
  return isNumeric(value) && !Number.isInteger(value)
}

/**
 * Returns how many fraction digits a number has.
 * @ignore
 *
 * @param  {Number} number - The number to test.
 *
 * @return {Number}
 */
export function countFractionDigits(number = 0) {
  const fractionDigits = number.toString().split('.')[1]
  return fractionDigits ? fractionDigits.length : 0
}
