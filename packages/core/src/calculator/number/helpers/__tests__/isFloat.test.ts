import { isFloat } from '../isFloat';

describe('isFloat', () => {
  it('returns false with an integer', () => {
    expect(isFloat(5)).toBe(false);
  });
  it('returns true with a float', () => {
    expect(isFloat(5.5)).toBe(true);
  });
  it('returns true with a number in scientific notation', () => {
    expect(isFloat(1e-15)).toBe(true);
  });
  it('returns false with NaN', () => {
    expect(isFloat(NaN)).toBe(false);
  });
  it('returns false with Infinity', () => {
    expect(isFloat(Infinity)).toBe(false);
  });
});
