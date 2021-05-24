import { subtract } from '../subtract';

describe('subtract', () => {
  it('subtracts positive numbers', () => {
    expect(subtract(1n, 2n)).toBe(-1n);
  });
  it('subtracts negative numbers', () => {
    expect(subtract(-1n, -2n)).toBe(1n);
  });
});
