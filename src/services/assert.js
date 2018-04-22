import { isPercentage, areValidRatios } from './helpers'

/**
 * Performs an assertion.
 * @ignore
 *
 * @param  {Boolean} condition - The expression to assert.
 * @param  {Error}   [err=Error] - The error to throw if the assertion fails.
 *
 * @throws {Error} If `condition` returns `false`.
 */
export function assert(condition, err = new Error()) {
  if (!condition) throw err
}

/**
 * Asserts a value is a percentage.
 * @ignore
 *
 * @param  {}  percentage - The percentage to test.
 *
 * @throws {RangeError} If `percentage` is out of range.
 */
export function assertPercentage(percentage) {
  assert(
    isPercentage(percentage),
    new RangeError('You must provide a numeric value between 0 and 100.')
  )
}

/**
 * Asserts an array of ratios is valid.
 * @ignore
 *
 * @param  {}  ratios - The ratios to test.
 *
 * @throws {TypeError} If `ratios` are invalid.
 */
export function assertValidRatios(ratios) {
  assert(
    areValidRatios(ratios),
    new TypeError(
      'You must provide a non-empty array of numeric values greater than 0.'
    )
  )
}

/**
 * Asserts a value is an integer.
 * @ignore
 *
 * @param  {}  number - The value to test.
 *
 * @return {Boolean}
 */
export function assertInteger(number) {
  assert(
    Number.isInteger(number),
    new TypeError('You must provide an integer.')
  )
}
