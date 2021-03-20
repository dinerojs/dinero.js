import { isEven } from '../isEven';

describe('isEven', () => {
  it('returns true for a positive even integer', () => {
    expect(isEven(202)).toBe(true);
  });
  it('returns true for a negative even integer', () => {
    expect(isEven(-202)).toBe(true);
  });
  it('returns false for a positive odd integer', () => {
    expect(isEven(101)).toBe(false);
  });
  it('returns false for a negative odd integer', () => {
    expect(isEven(-101)).toBe(false);
  });
});
