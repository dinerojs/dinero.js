open DivideOperation
open Calculator
open Absolute
open IsHalf
open Down
open Up

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round up.
 *
 * Rounding up happens when:
 * - The quotient is half (e.g., -1.5, 1.5).
 * - The quotient is positive and greater than half (e.g., 1.6).
 * - The quotient is negative and less than half (e.g., -1.4).
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
let halfUp: divideOperation<'amount> = (amount, factor, calculator) => {
  let greaterThanFn = GreaterThanUtil.greaterThan(calculator)
  let isHalfFn = isHalf(calculator)
  let absoluteFn = absolute(calculator)

  let zero = calculator.zero()
  let remainder = absoluteFn(calculator.modulo(amount, factor))
  let difference = calculator.subtract(factor, remainder)
  let isLessThanHalf = greaterThanFn(difference, remainder)
  let isPositive = greaterThanFn(amount, zero)

  if isHalfFn(amount, factor) || (isPositive && !isLessThanHalf) || (!isPositive && isLessThanHalf) {
    up(amount, factor, calculator)
  } else {
    down(amount, factor, calculator)
  }
}