import greaterThan from '../greaterThan';

describe('greaterThan', () => {
  it('returns true when the first bigint is greater than the other with positive bigints', () => {
    expect(greaterThan(4n, 3n)).toBe(true);
  });
  it('returns true when the first bigint is greater than the other with negative bigints', () => {
    expect(greaterThan(-2n, -3n)).toBe(true);
  });
  it('returns false when the first bigint is less than the other with positive bigints', () => {
    expect(greaterThan(1n, 2n)).toBe(false);
  });
  it('returns false when the first bigint is less than the other with negative bigints', () => {
    expect(greaterThan(-3n, -2n)).toBe(false);
  });
});
