import areEqual from '../areEqual';

describe('areEqual', () => {
  it('returns true with equal positive numbers', () => {
    expect(areEqual(2, 2)).toBe(true);
  });
  it('returns true with equal negative numbers', () => {
    expect(areEqual(-2, -2)).toBe(true);
  });
  it('returns true with equal floats numbers', () => {
    expect(areEqual(1.2, 1.2)).toBe(true);
  });
  it('returns true with equal numbers in scientific notation', () => {
    expect(areEqual(1e5, 1e5)).toBe(true);
  });
  it('returns false with equal positive numbers', () => {
    expect(areEqual(2, 3)).toBe(false);
  });
  it('returns false with equal negative numbers', () => {
    expect(areEqual(-2, -3)).toBe(false);
  });
  it('returns false with equal floats numbers', () => {
    expect(areEqual(1.2, 1.3)).toBe(false);
  });
  it('returns false with equal numbers in scientific notation', () => {
    expect(areEqual(1e5, 2e5)).toBe(false);
  });
});
