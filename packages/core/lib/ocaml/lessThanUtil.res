open Calculator

/**
 * Returns a lessThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThan function.
 */
let lessThan = (calculator: calculator<'amount>) => {
  (subject: 'amount, comparator: 'amount) => {
    calculator.compare(subject, comparator) === LT
  }
}