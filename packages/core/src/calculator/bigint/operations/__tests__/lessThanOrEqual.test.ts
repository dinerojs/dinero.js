import lessThanOrEqual from '../lessThanOrEqual';

describe('lessThanOrEqual', () => {
  it('returns true when the first bigint is less than the other with positive bigints', () => {
    expect(lessThanOrEqual(1n, 2n)).toBe(true);
  });
  it('returns true when the first bigint is less than the other with negative bigints', () => {
    expect(lessThanOrEqual(-3n, -2n)).toBe(true);
  });
  it('returns true with equal positive bigints', () => {
    expect(lessThanOrEqual(2n, 2n)).toBe(true);
  });
  it('returns true with equal negative bigints', () => {
    expect(lessThanOrEqual(-2n, -2n)).toBe(true);
  });
  it('returns false when the first bigint is greater than the other with positive bigints', () => {
    expect(lessThanOrEqual(4n, 3n)).toBe(false);
  });
  it('returns false when the first bigint is greater than the other with negative bigints', () => {
    expect(lessThanOrEqual(-2n, -3n)).toBe(false);
  });
});
