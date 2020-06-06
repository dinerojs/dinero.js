import multiply from '../multiply';

describe('multiply', () => {
  it('multiplies positive numbers', () => {
    expect(multiply(10, 20, 30)).toBe(6000);
  });
  it('multiplies negative numbers', () => {
    expect(multiply(-10, -20, -30)).toBe(-6000);
  });
  it('multiplies floats', () => {
    expect(multiply(8.52, 8.6186)).toBe(73.430472);
  });
  it('multiplies numbers in scientific notation', () => {
    expect(multiply(1e5, 2e5, 3e5)).toBe(6000000000000000);
  });
});
