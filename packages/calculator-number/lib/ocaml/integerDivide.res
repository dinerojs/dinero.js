/**
 * Returns the quotient of two numbers with no fractional part.
 *
 * @param dividend - The number to divide.
 * @param divisor - The number to divide with.
 *
 * @returns The quotient of the two numbers.
 */
let integerDivide = (dividend: float, divisor: float): float => {
  Math.trunc(dividend / divisor)
}