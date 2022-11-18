import { calculator } from '@dinero.js/calculator-number';

import { isEven } from '../isEven';

const isEvenFn = isEven(calculator);

describe('isEven', () => {
  it('returns true for a positive even integer', () => {
    expect(isEvenFn(202)).toBe(true);
  });
  it('returns true for a negative even integer', () => {
    expect(isEvenFn(-202)).toBe(true);
  });
  it('returns false for a positive odd integer', () => {
    expect(isEvenFn(101)).toBe(false);
  });
  it('returns false for a negative odd integer', () => {
    expect(isEvenFn(-101)).toBe(false);
  });
});
