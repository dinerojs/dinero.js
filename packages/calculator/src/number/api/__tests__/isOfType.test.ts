import { isOfType } from '../isOfType';

describe('isOfType', () => {
  it('returns true with positive integers', () => {
    expect(isOfType(1)).toBe(true);
  });
  it('returns true with negative integers', () => {
    expect(isOfType(-1)).toBe(true);
  });
  it('returns false with positive floats', () => {
    expect(isOfType(1.5)).toBe(false);
  });
  it('returns false with negative floats', () => {
    expect(isOfType(-1.5)).toBe(false);
  });
  it('returns false with NaN', () => {
    expect(isOfType(NaN)).toBe(false);
  });
  it('returns false with Infinity', () => {
    expect(isOfType(Infinity)).toBe(false);
  });
});
