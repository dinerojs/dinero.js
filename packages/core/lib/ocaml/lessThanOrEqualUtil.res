open Calculator
open EqualUtil
open LessThanUtil

/**
 * Returns a lessThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The lessThanOrEqual function.
 */
let lessThanOrEqual = (calculator: calculator<'amount>) => {
  let lessThanFn = lessThan(calculator)
  let equalFn = equal(calculator)
  
  (subject: 'amount, comparator: 'amount) => {
    lessThanFn(subject, comparator) || equalFn(subject, comparator)
  }
}