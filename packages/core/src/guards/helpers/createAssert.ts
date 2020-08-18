/* eslint-disable functional/no-expression-statement, functional/immutable-data */
function createAssert(isProduction: boolean) {
  const prefix = 'Assertion failed';

  function assert(condition: boolean, ErrorType = Error, message = '') {
    if (condition) {
      return undefined;
    }

    const err = new ErrorType();
    err.name = prefix;

    if (!isProduction) {
      err.message = message;
    }

    return err;
  }

  return assert;
}

export default createAssert;
