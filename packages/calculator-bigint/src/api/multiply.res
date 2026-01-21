/**
 * Returns the product of two bigints.
 *
 * @param multiplicand - The bigint to multiply.
 * @param multiplier - The bigint to multiply with.
 *
 * @returns The product of the two bigints.
 */
let multiply = (multiplicand: BigInt.t, multiplier: BigInt.t): BigInt.t => {
  BigInt.mul(multiplicand, multiplier)
}