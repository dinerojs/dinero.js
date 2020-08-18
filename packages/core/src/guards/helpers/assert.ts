/* eslint-disable functional/no-throw-statement, valid-jsdoc */
import { createAssert } from '.';

const isProduction = process.env.NODE_ENV === 'production';
const assertUtility = createAssert(isProduction);

/**
 * Assert a condition.
 *
 * @param condition The condition to verify.
 * @param message The error message to throw.
 *
 * @throws If the condition isn't met.
 */
function assert<TError extends ErrorConstructor>(
  condition: boolean,
  ErrorType?: TError,
  message?: string
) {
  const err = assertUtility(condition, ErrorType, message);

  if (err) {
    throw err;
  }
}

export default assert;
