open Calculator

/**
 * Returns an isEven function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The isEven function.
 */
let isEven = (calculator: calculator<'amount>) => {
  let zero = calculator.zero()
  let two = calculator.increment(calculator.increment(zero))

  (input: 'amount) => {
    calculator.compare(calculator.modulo(input, two), zero) == EQ
  }
}