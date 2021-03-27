import { modulo } from '../modulo';

describe('modulo', () => {
  it('performs a modulo with positive numbers', () => {
    expect(modulo(5, 3)).toBe(2);
  });
  it('performs a modulo with negative numbers', () => {
    expect(modulo(-5, -4)).toBe(-1);
  });
  it('performs a modulo with floats', () => {
    expect(modulo(10.5, 2.5)).toBe(0.5);
  });
  it('performs a modulo with numbers in scientific notation', () => {
    expect(modulo(4e5, 3e5)).toBe(100000);
  });
});
