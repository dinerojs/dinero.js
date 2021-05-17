import { compare } from '@dinero.js/calculator-number';

import { greaterThanOrEqual } from '../greaterThanOrEqual';

const greaterThanOrEqualFn = greaterThanOrEqual({ compare });

describe('greaterThanOrEqual', () => {
  it('returns true when the first number is greater than the other with positive numbers', () => {
    expect(greaterThanOrEqualFn(4, 3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with negative numbers', () => {
    expect(greaterThanOrEqualFn(-2, -3)).toBe(true);
  });
  it('returns true when the first number is greater than the other with floats', () => {
    expect(greaterThanOrEqualFn(2.2, 1.2)).toBe(true);
  });
  it('returns true when the first number is greater than the other with numbers in scientific notation', () => {
    expect(greaterThanOrEqualFn(2e5, 1e5)).toBe(true);
  });
  it('returns true with equal positive numbers', () => {
    expect(greaterThanOrEqualFn(2, 2)).toBe(true);
  });
  it('returns true with equal negative numbers', () => {
    expect(greaterThanOrEqualFn(-2, -2)).toBe(true);
  });
  it('returns true with equal floats', () => {
    expect(greaterThanOrEqualFn(2.2, 2.2)).toBe(true);
  });
  it('returns true with equal numbers in scientific notation', () => {
    expect(greaterThanOrEqualFn(2e5, 2e5)).toBe(true);
  });
  it('returns false when the first number is less than the other with positive numbers', () => {
    expect(greaterThanOrEqualFn(1, 2)).toBe(false);
  });
  it('returns false when the first number is less than the other with negative numbers', () => {
    expect(greaterThanOrEqualFn(-3, -2)).toBe(false);
  });
  it('returns false when the first number is less than the other with floats', () => {
    expect(greaterThanOrEqualFn(0.2, 1.2)).toBe(false);
  });
  it('returns false when the first number is less than the other with numbers in scientific notation', () => {
    expect(greaterThanOrEqualFn(1e5, 2e5)).toBe(false);
  });
});
