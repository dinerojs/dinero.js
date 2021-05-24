import { decrement } from '../decrement';

describe('decrement', () => {
  it('decrements positive numbers', () => {
    expect(decrement(2n)).toBe(1n);
  });
  it('decrements negative numbers', () => {
    expect(decrement(-2n)).toBe(-3n);
  });
});
