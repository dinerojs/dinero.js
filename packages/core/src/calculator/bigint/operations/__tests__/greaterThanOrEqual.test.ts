import greaterThanOrEqual from '../greaterThanOrEqual';

describe('greaterThanOrEqual', () => {
  it('returns true when the first bigint is greater than the other with positive bigints', () => {
    expect(greaterThanOrEqual(4n, 3n)).toBe(true);
  });
  it('returns true when the first bigint is greater than the other with negative bigints', () => {
    expect(greaterThanOrEqual(-2n, -3n)).toBe(true);
  });
  it('returns true with equal positive bigints', () => {
    expect(greaterThanOrEqual(2n, 2n)).toBe(true);
  });
  it('returns true with equal negative bigints', () => {
    expect(greaterThanOrEqual(-2n, -2n)).toBe(true);
  });
  it('returns false when the first bigint is less than the other with positive bigints', () => {
    expect(greaterThanOrEqual(1n, 2n)).toBe(false);
  });
  it('returns false when the first bigint is less than the other with negative bigints', () => {
    expect(greaterThanOrEqual(-3n, -2n)).toBe(false);
  });
});
