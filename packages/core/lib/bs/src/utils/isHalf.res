open Calculator
open Absolute

/**
 * Returns an isHalf function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The isHalf function.
 */
let isHalf = (calculator: calculator<'amount>) => {
  let absoluteFn = absolute(calculator)

  (input: 'amount, total: 'amount) => {
    let remainder = absoluteFn(calculator.modulo(input, total))
    let difference = calculator.subtract(total, remainder)

    calculator.compare(difference, remainder) == EQ
  }
}