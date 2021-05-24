import { multiply } from '../multiply';

describe('multiply', () => {
  it('multiplies positive numbers', () => {
    expect(multiply(10n, 20n)).toBe(200n);
  });
  it('multiplies negative numbers', () => {
    expect(multiply(-10n, -20n)).toBe(200n);
  });
});
