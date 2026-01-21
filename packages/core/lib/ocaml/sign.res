open Calculator

/**
 * Returns the sign of an amount.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The sign function.
 */
let sign = (calculator: calculator<'amount>) => {
  let equalFn = EqualUtil.equal(calculator)
  let lessThanFn = LessThanUtil.lessThan(calculator)
  let zero = calculator.zero()

  (input: 'amount) => {
    if equalFn(input, zero) {
      zero
    } else {
      let one = calculator.increment(zero)
      let minusOne = calculator.decrement(zero)
      
      if lessThanFn(input, zero) { minusOne } else { one }
    }
  }
}