import { compare } from '@dinero.js/calculator-number';

import { maximum } from '../maximum';

const maximumFn = maximum({ compare });

describe('maximum', () => {
  it('gets the greatest from positive numbers', () => {
    expect(maximumFn([5, 3, 2])).toBe(5);
  });
  it('gets the greatest from negative numbers', () => {
    expect(maximumFn([-5, -4, -2])).toBe(-2);
  });
  it('gets the greatest from floats', () => {
    expect(maximumFn([10.5, 2.5, 1.6])).toBe(10.5);
  });
  it('gets the greatest from numbers in scientific notation', () => {
    expect(maximumFn([4e5, 3e5, 2e5])).toBe(4e5);
  });
});
