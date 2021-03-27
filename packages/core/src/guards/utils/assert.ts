/* eslint-disable functional/no-throw-statement, valid-jsdoc */
import { createAssert } from './createAssert';

const isProduction = process.env.NODE_ENV === 'production';
const _assert = createAssert(isProduction);

/**
 * Assert a condition.
 *
 * @param condition The condition to verify.
 * @param message The error message to throw.
 *
 * @throws If the condition isn't met.
 */
export function assert<TError extends ErrorConstructor>(
  condition: boolean,
  ErrorType?: TError,
  message?: string
) {
  const err = _assert(condition, ErrorType, message);

  if (err) {
    throw err;
  }
}
