import { decrement } from '../decrement.js';

describe('decrement', () => {
  it('decrements positive numbers', () => {
    expect(decrement(3n)).toBe(2n);
  });
  it('decrements negative numbers', () => {
    expect(decrement(-1n)).toBe(-2n);
  });
});