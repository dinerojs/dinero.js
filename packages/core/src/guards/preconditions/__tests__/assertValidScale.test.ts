import assertValidScale from '../assertValidScale';

describe('assertValidScale', () => {
  it("doesn't throw when the condition is met", () => {
    expect(() => assertValidScale(true)).not.toThrow();
  });
  it("throws when the condition isn't met", () => {
    expect(() => assertValidScale(false)).toThrowError('Scale is invalid.');
  });
});
