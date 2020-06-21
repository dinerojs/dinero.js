import equal from '../equal';

describe('equal', () => {
  it('returns true with equal positive bigints', () => {
    expect(equal(2n, 2n)).toBe(true);
  });
  it('returns true with equal negative bigints', () => {
    expect(equal(-2n, -2n)).toBe(true);
  });
  it('returns false with equal positive bigints', () => {
    expect(equal(2n, 3n)).toBe(false);
  });
  it('returns false with equal negative bigints', () => {
    expect(equal(-2n, -3n)).toBe(false);
  });
});
