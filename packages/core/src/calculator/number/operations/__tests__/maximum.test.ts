import maximum from '../maximum';

describe('maximum', () => {
  it('gets the greatest from positive numbers', () => {
    expect(maximum(5, 3, 2)).toBe(5);
  });
  it('gets the greatest from negative numbers', () => {
    expect(maximum(-5, -4, -2)).toBe(-2);
  });
  it('gets the greatest from floats', () => {
    expect(maximum(10.5, 2.5, 1.6)).toBe(10.5);
  });
  it('gets the greatest from numbers in scientific notation', () => {
    expect(maximum(4e5, 3e5, 2e5)).toBe(4e5);
  });
});
