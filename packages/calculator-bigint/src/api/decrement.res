/**
 * Returns a decremented bigint.
 *
 * @param value - The bigint to decrement.
 *
 * @returns The decremented bigint.
 */
let decrement = (value: BigInt.t): BigInt.t => {
  BigInt.sub(value, BigInt.fromInt(1))
}
