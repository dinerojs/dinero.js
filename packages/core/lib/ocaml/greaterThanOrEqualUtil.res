open Calculator
open EqualUtil
open GreaterThanUtil

/**
 * Returns a greaterThanOrEqual function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThanOrEqual function.
 */
let greaterThanOrEqual = (calculator: calculator<'amount>) => {
  let greaterThanFn = greaterThan(calculator)
  let equalFn = equal(calculator)
  
  (subject: 'amount, comparator: 'amount) => {
    greaterThanFn(subject, comparator) || equalFn(subject, comparator)
  }
}