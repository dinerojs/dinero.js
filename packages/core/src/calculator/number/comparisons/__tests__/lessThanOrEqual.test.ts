import lessThanOrEqual from '../lessThanOrEqual';

describe('lessThanOrEqual', () => {
  it('returns true when the first number is less than the other with positive numbers', () => {
    expect(lessThanOrEqual(1, 2)).toBe(true);
  });
  it('returns true when the first number is less than the other with negative numbers', () => {
    expect(lessThanOrEqual(-3, -2)).toBe(true);
  });
  it('returns true when the first number is less than the other with floats', () => {
    expect(lessThanOrEqual(1.2, 2.2)).toBe(true);
  });
  it('returns true when the first number is less than the other with numbers in scientific notation', () => {
    expect(lessThanOrEqual(2e5, 3e5)).toBe(true);
  });
  it('returns true with equal positive numbers', () => {
    expect(lessThanOrEqual(2, 2)).toBe(true);
  });
  it('returns true with equal negative numbers', () => {
    expect(lessThanOrEqual(-2, -2)).toBe(true);
  });
  it('returns true with equal floats', () => {
    expect(lessThanOrEqual(2.2, 2.2)).toBe(true);
  });
  it('returns true with equal numbers in scientific notation', () => {
    expect(lessThanOrEqual(2e5, 2e5)).toBe(true);
  });
  it('returns false when the first number is greater than the other with positive numbers', () => {
    expect(lessThanOrEqual(4, 3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with negative numbers', () => {
    expect(lessThanOrEqual(-2, -3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with floats', () => {
    expect(lessThanOrEqual(3.2, 2.2)).toBe(false);
  });
  it('returns false when the first number is greater than the other with numbers in scientific notation', () => {
    expect(lessThanOrEqual(3e5, 2e5)).toBe(false);
  });
});
