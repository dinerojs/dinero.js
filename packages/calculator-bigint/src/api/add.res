/**
 * Returns the sum of two bigints.
 *
 * @param augend - The bigint to add to.
 * @param addend - The bigint to add.
 *
 * @returns The sum of the two bigints.
 */
let add = (augend: BigInt.t, addend: BigInt.t): BigInt.t => {
  BigInt.add(augend, addend)
}
