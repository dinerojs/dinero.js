import { compare } from '@dinero.js/calculator-number';

import { lessThanOrEqual } from '../lessThanOrEqual';

const lessThanOrEqualFn = lessThanOrEqual({ compare });

describe('lessThanOrEqual', () => {
  it('returns true when the first number is less than the other with positive numbers', () => {
    expect(lessThanOrEqualFn(1, 2)).toBe(true);
  });
  it('returns true when the first number is less than the other with negative numbers', () => {
    expect(lessThanOrEqualFn(-3, -2)).toBe(true);
  });
  it('returns true when the first number is less than the other with floats', () => {
    expect(lessThanOrEqualFn(1.2, 2.2)).toBe(true);
  });
  it('returns true when the first number is less than the other with numbers in scientific notation', () => {
    expect(lessThanOrEqualFn(2e5, 3e5)).toBe(true);
  });
  it('returns true with equal positive numbers', () => {
    expect(lessThanOrEqualFn(2, 2)).toBe(true);
  });
  it('returns true with equal negative numbers', () => {
    expect(lessThanOrEqualFn(-2, -2)).toBe(true);
  });
  it('returns true with equal floats', () => {
    expect(lessThanOrEqualFn(2.2, 2.2)).toBe(true);
  });
  it('returns true with equal numbers in scientific notation', () => {
    expect(lessThanOrEqualFn(2e5, 2e5)).toBe(true);
  });
  it('returns false when the first number is greater than the other with positive numbers', () => {
    expect(lessThanOrEqualFn(4, 3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with negative numbers', () => {
    expect(lessThanOrEqualFn(-2, -3)).toBe(false);
  });
  it('returns false when the first number is greater than the other with floats', () => {
    expect(lessThanOrEqualFn(3.2, 2.2)).toBe(false);
  });
  it('returns false when the first number is greater than the other with numbers in scientific notation', () => {
    expect(lessThanOrEqualFn(3e5, 2e5)).toBe(false);
  });
});
