import { compare } from '@dinero.js/calculator-number';

import { equal } from '../equal';

const equalFn = equal({ compare });

describe('equal', () => {
  it('returns true with equal positive numbers', () => {
    expect(equalFn(2, 2)).toBe(true);
  });
  it('returns true with equal negative numbers', () => {
    expect(equalFn(-2, -2)).toBe(true);
  });
  it('returns true with equal floats numbers', () => {
    expect(equalFn(1.2, 1.2)).toBe(true);
  });
  it('returns true with equal numbers in scientific notation', () => {
    expect(equalFn(1e5, 1e5)).toBe(true);
  });
  it('returns false with unequal positive numbers', () => {
    expect(equalFn(2, 3)).toBe(false);
  });
  it('returns false with unequal negative numbers', () => {
    expect(equalFn(-2, -3)).toBe(false);
  });
  it('returns false with unequal floats numbers', () => {
    expect(equalFn(1.2, 1.3)).toBe(false);
  });
  it('returns false with unequal numbers in scientific notation', () => {
    expect(equalFn(1e5, 2e5)).toBe(false);
  });
});
