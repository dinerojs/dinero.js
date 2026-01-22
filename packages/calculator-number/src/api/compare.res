/**
 * Compare two numbers.
 *
 * @param a - The first number to compare.
 * @param b - The second number to compare.
 *
 * @returns Whether the two numbers are equal, or whether the first one is greater or less than the other.
 */
let compare = (a: float, b: float): DinerojsCore.Calculator.comparisonOperator => {
  if a < b {
    LT
  } else if a > b {
    GT
  } else {
    EQ
  }
}
