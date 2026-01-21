import { isScaledAmount, fromValue } from '../isScaledAmount';

describe('isScaledAmount', () => {
  it('returns false with an integer', () => {
    expect(isScaledAmount(fromValue(100))).toBe(false);
  });
  it('returns true with a scaled amount', () => {
    expect(isScaledAmount(fromValue({ amount: 100, scale: 0 }))).toBe(true);
  });
  it('returns true with a scaled amount without a scale', () => {
    expect(isScaledAmount(fromValue({ amount: 100 }))).toBe(true);
  });
});
