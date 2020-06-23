import lessThan from '../lessThan';

describe('lessThan', () => {
  it('returns true when the first number is less than the other with positive numbers', () => {
    expect(lessThan(1, 2)).toBe(true);
  });
  it('returns true when the first number is less than the other with negative numbers', () => {
    expect(lessThan(-3, -2)).toBe(true);
  });
  it('returns true when the first number is less than the other with floats', () => {
    expect(lessThan(1.2, 2.2)).toBe(true);
  });
  it('returns true when the first number is less than the other with numbers in scientific notation', () => {
    expect(lessThan(2e5, 3e5)).toBe(true);
  });
  it('returns false when the first number is greater than the other with positive numbers', () => {
    expect(lessThan(4, 3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with negative numbers', () => {
    expect(lessThan(-2, -3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with floats', () => {
    expect(lessThan(3.2, 2.2)).toBe(false);
  });
  it('returns false when the first number is greater than the other with numbers in scientific notation', () => {
    expect(lessThan(3e5, 2e5)).toBe(false);
  });
});
