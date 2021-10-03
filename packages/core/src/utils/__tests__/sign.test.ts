import { calculator } from '@dinero.js/calculator-number';

import { sign } from '../sign';

const signFn = sign(calculator);

describe('sign', () => {
  it('returns 0 with positive zero', () => {
    expect(signFn(0)).toBe(0);
  });
  it('returns 0 with negative zero', () => {
    expect(signFn(-0)).toBe(0);
  });
  it('returns 1 with positive values', () => {
    expect(signFn(5)).toBe(1);
  });
  it('returns -1 with negative values', () => {
    expect(signFn(-5)).toBe(-1);
  });
});
