open Calculator

/**
 * Returns a greaterThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThan function.
 */
let greaterThan = (calculator: calculator<'amount>) => {
  (subject: 'amount, comparator: 'amount) => {
    calculator.compare(subject, comparator) === GT
  }
}