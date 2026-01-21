open Calculator

/**
 * Returns an equal function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The equal function.
 */
let equal = (calculator: calculator<'amount>) => {
  (subject: 'amount, comparator: 'amount) => {
    calculator.compare(subject, comparator) === EQ
  }
}