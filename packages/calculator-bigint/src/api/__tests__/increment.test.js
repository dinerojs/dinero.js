import { increment } from '../increment.js';

describe('increment', () => {
  it('increments positive numbers', () => {
    expect(increment(2n)).toBe(3n);
  });
  it('increments negative numbers', () => {
    expect(increment(-2n)).toBe(-1n);
  });
});