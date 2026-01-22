type comparisonOperator = LT | EQ | GT

/**
 * Compare two bigints.
 *
 * @param a - The first bigint to compare.
 * @param b - The second bigint to compare.
 *
 * @returns Whether the two bigints are equal, or whether the first one is greater or less than the other.
 */
let compare = (a: BigInt.t, b: BigInt.t): comparisonOperator => {
  if a < b {
    LT
  } else if a > b {
    GT
  } else {
    EQ
  }
}
