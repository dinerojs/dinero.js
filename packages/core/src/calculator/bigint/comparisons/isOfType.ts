/**
 * Check whether a value is a bigint.
 *
 * @param value The value to check.
 *
 * @returns Whether the value is a bigint.
 */
function isOfType(value: bigint) {
  return typeof value === 'bigint';
}

export default isOfType;
