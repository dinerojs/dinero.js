/**
 * Returns a bigint to the power of an exponent.
 *
 * @param base - The base bigint.
 * @param exponent - The exponent to raise the base to.
 *
 * @returns The base to the power of the exponent.
 */
let power = (base: BigInt.t, exponent: BigInt.t): BigInt.t => {
  let _baseValue = base
  let _exponentValue = exponent
  %raw(`BigInt(_baseValue) ** BigInt(_exponentValue)`)
}
