import { calculator } from '@dinero.js/calculator-number';

import { absolute } from '../absolute';

const absoluteFn = absolute(calculator);

describe('absolute', () => {
  it('returns the value with positive values', () => {
    expect(absoluteFn(5)).toBe(5);
  });
  it('returns the negation of the value with negative values', () => {
    expect(absoluteFn(-5)).toBe(5);
  });
  it('returns the value with positive zero', () => {
    expect(absoluteFn(0)).toBe(0);
  });
  it('returns the negation of the value with negative zero', () => {
    expect(absoluteFn(-0)).toBe(0);
  });
});
