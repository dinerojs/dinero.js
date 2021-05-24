import { modulo } from '../modulo';

describe('modulo', () => {
  it('performs a modulo with positive numbers', () => {
    expect(modulo(5n, 3n)).toBe(2n);
  });
  it('performs a modulo with negative numbers', () => {
    expect(modulo(-5n, -4n)).toBe(-1n);
  });
});
