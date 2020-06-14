import greaterThan from '../greaterThan';

describe('greaterThan', () => {
  it('returns true when the first number is greater than the other with positive numbers', () => {
    expect(greaterThan(4, 3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with negative numbers', () => {
    expect(greaterThan(-2, -3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with floats', () => {
    expect(greaterThan(2.2, 1.2)).toBe(true);
  });
  it('returns true when the first number is greater than the other with numbers in scientific notation', () => {
    expect(greaterThan(2e5, 1e5)).toBe(true);
  });
  it('returns false when the first number is less than the other with positive numbers', () => {
    expect(greaterThan(1, 2)).toBe(false);
  });
  it('returns false when the first number is less than the other with negative numbers', () => {
    expect(greaterThan(-3, -2)).toBe(false);
  });
  it('returns false when the first number is less than the other with floats', () => {
    expect(greaterThan(1.2, 2.2)).toBe(false);
  });
  it('returns false when the first number is less than the other with numbers in scientific notation', () => {
    expect(greaterThan(1e5, 2e5)).toBe(false);
  });
});
