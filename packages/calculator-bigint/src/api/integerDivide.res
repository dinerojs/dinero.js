/**
 * Returns the quotient of two bigints with no fractional part.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The quotient of the two bigints.
 */
let integerDivide = (dividend: BigInt.t, divisor: BigInt.t): BigInt.t => {
  BigInt.div(dividend, divisor)
}
