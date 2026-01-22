import { decrement } from '../lib/es6/src/api/decrement.js';

describe('decrement', () => {
  it('decrements positive numbers', () => {
    expect(decrement(3n)).toBe(2n);
  });
  it('decrements negative numbers', () => {
    expect(decrement(-1n)).toBe(-2n);
  });
});