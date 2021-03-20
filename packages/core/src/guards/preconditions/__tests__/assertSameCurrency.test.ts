import { assertSameCurrency } from '../assertSameCurrency';

describe('assertSameCurrency', () => {
  it("doesn't throw when the condition is met", () => {
    expect(() => assertSameCurrency(true)).not.toThrow();
  });
  it("throws when the condition isn't met", () => {
    expect(() => assertSameCurrency(false)).toThrowError(
      "Dinero objects don't have the same currency."
    );
  });
});
