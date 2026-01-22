import { isArray } from '../../lib/es6/src/utils/isArray.js';

describe('isArray', () => {
  it('returns true with arrays', () => {
    expect(isArray([])).toBe(true);
  });
  it('returns false with numbers', () => {
    expect(isArray(5)).toBe(false);
  });
});
