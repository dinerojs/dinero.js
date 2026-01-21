open Calculator
open EqualUtil
open LessThanUtil

/**
 * Returns the absolute value of an amount.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The absolute function.
 */
let absolute = (calculator: calculator<'amount>) => {
  let equalFn = equal(calculator)
  let lessThanFn = lessThan(calculator)
  let zero = calculator.zero()

  (input: 'amount) => {
    if equalFn(input, zero) {
      zero
    } else if lessThanFn(input, zero) {
      let minusOne = calculator.decrement(zero)
      calculator.multiply(minusOne, input)
    } else {
      input
    }
  }
}