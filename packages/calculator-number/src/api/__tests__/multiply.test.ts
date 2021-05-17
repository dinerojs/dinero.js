import { multiply } from '../multiply';

describe('multiply', () => {
  it('multiplies positive numbers', () => {
    expect(multiply(10, 20)).toBe(200);
  });
  it('multiplies negative numbers', () => {
    expect(multiply(-10, -20)).toBe(200);
  });
  it('multiplies numbers in scientific notation', () => {
    expect(multiply(1e5, 2e5)).toBe(20000000000);
  });
});
