import areEqual from '../areEqual';

describe('areEqual', () => {
  it('returns true with equal positive bigints', () => {
    expect(areEqual(2n, 2n)).toBe(true);
  });
  it('returns true with equal negative bigints', () => {
    expect(areEqual(-2n, -2n)).toBe(true);
  });
  it('returns false with equal positive bigints', () => {
    expect(areEqual(2n, 3n)).toBe(false);
  });
  it('returns false with equal negative bigints', () => {
    expect(areEqual(-2n, -3n)).toBe(false);
  });
});
