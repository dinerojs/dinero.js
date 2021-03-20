import { assertValidAmount } from '../assertValidAmount';

describe('assertValidAmount', () => {
  it("doesn't throw when the condition is met", () => {
    expect(() => assertValidAmount(true)).not.toThrow();
  });
  it("throws when the condition isn't met", () => {
    expect(() => assertValidAmount(false)).toThrowError('Amount is invalid.');
  });
});
