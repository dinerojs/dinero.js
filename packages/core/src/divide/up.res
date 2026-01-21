open DivideOperation
open Calculator



/**
 * Divide and round up.
 *
 * Rounding up happens whenever the quotient is not an integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
let up: divideOperation<'amount> = (amount, factor, calculator) => {
  let greaterThanFn = GreaterThanUtil.greaterThan(calculator)
  let equalFn = EqualUtil.equal(calculator)

  let zero = calculator.zero()
  let isPositive = greaterThanFn(amount, zero)
  let quotient = calculator.integerDivide(amount, factor)
  let remainder = calculator.modulo(amount, factor)
  let isInteger = equalFn(remainder, zero)

  if !isInteger && isPositive {
    calculator.increment(quotient)
  } else {
    quotient
  }
}