open Calculator

/**
 * Returns a compare function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The compare function.
 */
let compare = (calculator: calculator<'amount>) => {
  (subject: 'amount, comparator: 'amount) => {
    calculator.compare(subject, comparator)
  }
}