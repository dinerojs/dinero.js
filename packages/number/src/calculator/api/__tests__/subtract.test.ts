import { subtract } from '../subtract';

describe('subtract', () => {
  it('subtracts positive numbers', () => {
    expect(subtract(1, 2)).toBe(-1);
  });
  it('subtracts negative numbers', () => {
    expect(subtract(-1, -2)).toBe(1);
  });
  it('subtracts floats', () => {
    expect(subtract(1.5, 2.5)).toBe(-1);
  });
  it('subtracts numbers in scientific notation', () => {
    expect(subtract(1e5, 2e5)).toBe(-100000);
  });
});
