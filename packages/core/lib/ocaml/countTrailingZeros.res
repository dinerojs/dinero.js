open Calculator

/**
 * Counts trailing zeros in a number with the given base.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The countTrailingZeros function.
 */
let countTrailingZeros = (calculator: calculator<'amount>) => {
  (input: 'amount, base: 'amount) => {
    let zero = calculator.zero()

    if calculator.compare(zero, input) == EQ {
      calculator.zero()
    } else {
      let rec loop = (temp: 'amount, i: 'amount) => {
        if calculator.compare(calculator.modulo(temp, base), zero) == EQ {
          loop(calculator.integerDivide(temp, base), calculator.increment(i))
        } else {
          i
        }
      }
      loop(input, zero)
    }
  }
}