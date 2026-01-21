/**
 * Returns an incremented bigint.
 *
 * @param value - The bigint to increment.
 *
 * @returns The incremented bigint.
 */
let increment = (value: BigInt.t): BigInt.t => {
  BigInt.add(value, BigInt.fromInt(1))
}