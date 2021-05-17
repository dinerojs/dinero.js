import { compare } from '@dinero.js/calculator-number';

import { greaterThan } from '../greaterThan';

const greaterThanFn = greaterThan({ compare });

describe('greaterThan', () => {
  it('returns true when the first number is greater than the other with positive numbers', () => {
    expect(greaterThanFn(4, 3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with negative numbers', () => {
    expect(greaterThanFn(-2, -3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with floats', () => {
    expect(greaterThanFn(2.2, 1.2)).toBe(true);
  });
  it('returns true when the first number is greater than the other with numbers in scientific notation', () => {
    expect(greaterThanFn(2e5, 1e5)).toBe(true);
  });
  it('returns false when the first number is less than the other with positive numbers', () => {
    expect(greaterThanFn(1, 2)).toBe(false);
  });
  it('returns false when the first number is less than the other with negative numbers', () => {
    expect(greaterThanFn(-3, -2)).toBe(false);
  });
  it('returns false when the first number is less than the other with floats', () => {
    expect(greaterThanFn(1.2, 2.2)).toBe(false);
  });
  it('returns false when the first number is less than the other with numbers in scientific notation', () => {
    expect(greaterThanFn(1e5, 2e5)).toBe(false);
  });
});
