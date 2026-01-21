open DivideOperation
open Calculator
open IsEven
open IsHalf
open HalfUp

/**
 * Divide and round towards "nearest neighbor" unless both neighbors are
 * equidistant, in which case round to the nearest odd integer.
 *
 * @param amount - The amount to divide.
 * @param factor - The factor to divide by.
 * @param calculator - The calculator to use.
 *
 * @returns The rounded amount.
 */
let halfOdd: divideOperation<'amount> = (amount, factor, calculator) => {
  let isEvenFn = isEven(calculator)
  let isHalfFn = isHalf(calculator)

  let rounded = halfUp(amount, factor, calculator)

  if !isHalfFn(amount, factor) {
    rounded
  } else {
    if isEvenFn(rounded) { calculator.decrement(rounded) } else { rounded }
  }
}