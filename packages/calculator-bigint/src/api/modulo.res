/**
 * Returns the remainder of two bigints.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The remainder of the two bigints.
 */
let modulo = (dividend: BigInt.t, divisor: BigInt.t): BigInt.t => {
  BigInt.mod(dividend, divisor)
}