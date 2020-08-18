import assertValidRatios from '../assertValidRatios';

describe('assertValidRatios', () => {
  it("doesn't throw when the condition is met", () => {
    expect(() => assertValidRatios(true)).not.toThrow();
  });
  it("throws when the condition isn't met", () => {
    expect(() => assertValidRatios(false)).toThrowError('Ratios are invalid.');
  });
});
