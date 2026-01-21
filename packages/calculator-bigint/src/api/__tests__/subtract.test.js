import { subtract } from '../subtract.js';

describe('subtract', () => {
  it('subtracts positive numbers', () => {
    expect(subtract(5n, 3n)).toBe(2n);
  });
  it('subtracts negative numbers', () => {
    expect(subtract(-1n, -3n)).toBe(2n);
  });
});