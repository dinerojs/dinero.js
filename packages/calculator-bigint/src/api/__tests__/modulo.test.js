import { modulo } from '../modulo.js';

describe('modulo', () => {
  it('returns remainder of positive numbers', () => {
    expect(modulo(7n, 3n)).toBe(1n);
  });
  it('returns remainder of negative numbers', () => {
    expect(modulo(-7n, 3n)).toBe(-1n);
  });
});