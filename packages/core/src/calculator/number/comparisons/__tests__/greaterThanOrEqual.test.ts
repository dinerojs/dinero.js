import greaterThanOrEqual from '../greaterThanOrEqual';

describe('greaterThanOrEqual', () => {
  it('returns true when the first number is greater than the other with positive numbers', () => {
    expect(greaterThanOrEqual(4, 3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with negative numbers', () => {
    expect(greaterThanOrEqual(-2, -3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with floats', () => {
    expect(greaterThanOrEqual(2.2, 1.2)).toBe(true);
  });
  it('returns true when the first number is greater than the other with numbers in scientific notation', () => {
    expect(greaterThanOrEqual(2e5, 1e5)).toBe(true);
  });
  it('returns true with equal positive numbers', () => {
    expect(greaterThanOrEqual(2, 2)).toBe(true);
  });
  it('returns true with equal negative numbers', () => {
    expect(greaterThanOrEqual(-2, -2)).toBe(true);
  });
  it('returns true with equal floats', () => {
    expect(greaterThanOrEqual(2.2, 2.2)).toBe(true);
  });
  it('returns true with equal numbers in scientific notation', () => {
    expect(greaterThanOrEqual(2e5, 2e5)).toBe(true);
  });
  it('returns false when the first number is less than the other with positive numbers', () => {
    expect(greaterThanOrEqual(1, 2)).toBe(false);
  });
  it('returns false when the first number is less than the other with negative numbers', () => {
    expect(greaterThanOrEqual(-3, -2)).toBe(false);
  });
  it('returns false when the first number is less than the other with floats', () => {
    expect(greaterThanOrEqual(0.2, 1.2)).toBe(false);
  });
  it('returns false when the first number is less than the other with numbers in scientific notation', () => {
    expect(greaterThanOrEqual(1e5, 2e5)).toBe(false);
  });
});
