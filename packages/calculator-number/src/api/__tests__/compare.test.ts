import { ComparisonOperator } from '@dinero.js/core';

import { compare } from '../compare';

describe('compare', () => {
  describe('ComparisonOperator.LT', () => {
    it('returns `ComparisonOperator.LT` with positive numbers', () => {
      expect(compare(1, 2)).toBe(ComparisonOperator.LT);
    });
    it('returns `ComparisonOperator.LT` with negative numbers', () => {
      expect(compare(-2, -1)).toBe(ComparisonOperator.LT);
    });
    it('returns `ComparisonOperator.LT` with positive floats', () => {
      expect(compare(1.2, 2.2)).toBe(ComparisonOperator.LT);
    });
    it('returns `ComparisonOperator.LT` with negative floats', () => {
      expect(compare(-2.2, -1.2)).toBe(ComparisonOperator.LT);
    });
    it('returns `ComparisonOperator.LT` with a numbers in scientific notation', () => {
      expect(compare(1e5, 2e5)).toBe(ComparisonOperator.LT);
    });
  });
  describe('ComparisonOperator.GT', () => {
    it('returns `ComparisonOperator.GT` with positive numbers', () => {
      expect(compare(2, 1)).toBe(ComparisonOperator.GT);
    });
    it('returns `ComparisonOperator.GT` with negative numbers', () => {
      expect(compare(-1, -2)).toBe(ComparisonOperator.GT);
    });
    it('returns `ComparisonOperator.GT` with positive floats', () => {
      expect(compare(2.2, 1.2)).toBe(ComparisonOperator.GT);
    });
    it('returns `ComparisonOperator.GT` with negative floats', () => {
      expect(compare(-1.2, -2.2)).toBe(ComparisonOperator.GT);
    });
    it('returns `ComparisonOperator.GT` with a numbers in scientific notation', () => {
      expect(compare(2e5, 1e5)).toBe(ComparisonOperator.GT);
    });
  });
  describe('ComparisonOperator.EQ', () => {
    it('returns `ComparisonOperator.EQ` with positive numbers', () => {
      expect(compare(2, 2)).toBe(ComparisonOperator.EQ);
    });
    it('returns `ComparisonOperator.EQ` with negative numbers', () => {
      expect(compare(-2, -2)).toBe(ComparisonOperator.EQ);
    });
    it('returns `ComparisonOperator.EQ` with positive floats', () => {
      expect(compare(2.2, 2.2)).toBe(ComparisonOperator.EQ);
    });
    it('returns `ComparisonOperator.EQ` with negative floats', () => {
      expect(compare(-2.2, -2.2)).toBe(ComparisonOperator.EQ);
    });
    it('returns `ComparisonOperator.EQ` with a numbers in scientific notation', () => {
      expect(compare(2e5, 2e5)).toBe(ComparisonOperator.EQ);
    });
  });
});
