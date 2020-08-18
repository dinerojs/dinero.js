import createAssert from '../createAssert';

const errorMessage = 'Some error message.';

describe('createAssert', () => {
  it('returns an error which is an instance of the Error constructor', () => {
    const assert = createAssert(false);
    const err = assert(false, Error, errorMessage);

    expect(err).toBeInstanceOf(Error);
  });
  it('returns an error which is an instance of the passed constructor', () => {
    const assert = createAssert(false);
    const err = assert(false, TypeError, errorMessage);

    expect(err).toBeInstanceOf(TypeError);
  });
  describe('development', () => {
    const assert = createAssert(false);

    it('returns an error with the full error message', () => {
      const err = assert(false, Error, errorMessage);

      expect(err!.name).toBe('Assertion failed');
      expect(err!.message).toBe('Some error message.');
    });
  });
  describe('production', () => {
    const assert = createAssert(true);

    it('returns an error with a minimal error message', () => {
      const err = assert(false, Error, errorMessage);

      expect(err!.name).toBe('Assertion failed');
      expect(err!.message).toBe('');
    });
  });
});
