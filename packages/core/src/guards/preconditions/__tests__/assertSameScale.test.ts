import { assertSameScale } from '../assertSameScale';

describe('assertSameScale', () => {
  it("doesn't throw when the condition is met", () => {
    expect(() => assertSameScale(true)).not.toThrow();
  });
  it("throws when the condition isn't met", () => {
    expect(() => assertSameScale(false)).toThrowError(
      "Dinero objects don't have the same scale."
    );
  });
});
