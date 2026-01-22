import { increment } from '../lib/es6/src/api/increment.js';

describe('increment', () => {
  it('increments positive numbers', () => {
    expect(increment(2)).toBe(3);
  });
  it('increments negative numbers', () => {
    expect(increment(-2)).toBe(-1);
  });
});