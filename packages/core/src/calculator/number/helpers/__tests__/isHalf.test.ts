import { isHalf } from '../isHalf';

describe('#isHalf', () => {
  it('returns true with a half number', () => {
    expect(isHalf(2.5)).toBe(true);
  });
  it('returns true with a negative half number', () => {
    expect(isHalf(-2.5)).toBe(true);
  });
  it('returns false with a non-half number', () => {
    expect(isHalf(2)).toBe(false);
  });
});
