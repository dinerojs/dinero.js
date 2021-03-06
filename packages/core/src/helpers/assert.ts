/* eslint-disable functional/no-throw-statement, valid-jsdoc */
/**
 * Assert a condition.
 *
 * @param condition - The condition to verify.
 * @param message - The error message to throw.
 *
 * @throws If the condition isn't met.
 */
export function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[Dinero.js] ${message}`);
  }
}
