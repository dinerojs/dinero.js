import { isArray } from '..';

describe('isArray', () => {
  it('returns true with arrays', () => {
    expect(isArray([])).toBe(true);
  });
  it('returns false with numbers', () => {
    expect(isArray(5)).toBe(false);
  });
});
