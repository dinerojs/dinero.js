/**
 * Returns the difference between two bigints.
 *
 * @param minuend - The bigint to subtract from.
 * @param subtrahend - The bigint to subtract.
 *
 * @returns The difference of the two bigints.
 */
let subtract = (minuend: BigInt.t, subtrahend: BigInt.t): BigInt.t => {
  BigInt.sub(minuend, subtrahend)
}