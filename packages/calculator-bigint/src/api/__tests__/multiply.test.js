import { multiply } from '../multiply.js';

describe('multiply', () => {
  it('multiplies positive numbers', () => {
    expect(multiply(2n, 3n)).toBe(6n);
  });
  it('multiplies negative numbers', () => {
    expect(multiply(-2n, 3n)).toBe(-6n);
  });
});