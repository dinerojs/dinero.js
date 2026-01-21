import { add } from '../add.js';

describe('add', () => {
  it('adds up positive numbers', () => {
    expect(add(2n, 3n)).toBe(5n);
  });
  it('adds up negative numbers', () => {
    expect(add(-1n, -2n)).toBe(-3n);
  });
});