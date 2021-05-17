import { compare } from '@dinero.js/calculator-number';

import { lessThan } from '../lessThan';

const lessThanFn = lessThan({ compare });

describe('lessThan', () => {
  it('returns true when the first number is less than the other with positive numbers', () => {
    expect(lessThanFn(1, 2)).toBe(true);
  });
  it('returns true when the first number is less than the other with negative numbers', () => {
    expect(lessThanFn(-3, -2)).toBe(true);
  });
  it('returns true when the first number is less than the other with floats', () => {
    expect(lessThanFn(1.2, 2.2)).toBe(true);
  });
  it('returns true when the first number is less than the other with numbers in scientific notation', () => {
    expect(lessThanFn(2e5, 3e5)).toBe(true);
  });
  it('returns false when the first number is greater than the other with positive numbers', () => {
    expect(lessThanFn(4, 3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with negative numbers', () => {
    expect(lessThanFn(-2, -3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with floats', () => {
    expect(lessThanFn(3.2, 2.2)).toBe(false);
  });
  it('returns false when the first number is greater than the other with numbers in scientific notation', () => {
    expect(lessThanFn(3e5, 2e5)).toBe(false);
  });
});
