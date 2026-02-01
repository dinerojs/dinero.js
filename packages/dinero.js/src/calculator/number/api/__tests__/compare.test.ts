import { DineroComparisonOperator } from '../../../../core';

import { compare } from '../compare';

describe('compare', () => {
  describe('DineroComparisonOperator.LT', () => {
    it('returns `DineroComparisonOperator.LT` with positive numbers', () => {
      expect(compare(1, 2)).toBe(DineroComparisonOperator.LT);
    });
    it('returns `DineroComparisonOperator.LT` with negative numbers', () => {
      expect(compare(-2, -1)).toBe(DineroComparisonOperator.LT);
    });
    it('returns `DineroComparisonOperator.LT` with positive floats', () => {
      expect(compare(1.2, 2.2)).toBe(DineroComparisonOperator.LT);
    });
    it('returns `DineroComparisonOperator.LT` with negative floats', () => {
      expect(compare(-2.2, -1.2)).toBe(DineroComparisonOperator.LT);
    });
    it('returns `DineroComparisonOperator.LT` with a numbers in scientific notation', () => {
      expect(compare(1e5, 2e5)).toBe(DineroComparisonOperator.LT);
    });
  });
  describe('DineroComparisonOperator.GT', () => {
    it('returns `DineroComparisonOperator.GT` with positive numbers', () => {
      expect(compare(2, 1)).toBe(DineroComparisonOperator.GT);
    });
    it('returns `DineroComparisonOperator.GT` with negative numbers', () => {
      expect(compare(-1, -2)).toBe(DineroComparisonOperator.GT);
    });
    it('returns `DineroComparisonOperator.GT` with positive floats', () => {
      expect(compare(2.2, 1.2)).toBe(DineroComparisonOperator.GT);
    });
    it('returns `DineroComparisonOperator.GT` with negative floats', () => {
      expect(compare(-1.2, -2.2)).toBe(DineroComparisonOperator.GT);
    });
    it('returns `DineroComparisonOperator.GT` with a numbers in scientific notation', () => {
      expect(compare(2e5, 1e5)).toBe(DineroComparisonOperator.GT);
    });
  });
  describe('DineroComparisonOperator.EQ', () => {
    it('returns `DineroComparisonOperator.EQ` with positive numbers', () => {
      expect(compare(2, 2)).toBe(DineroComparisonOperator.EQ);
    });
    it('returns `DineroComparisonOperator.EQ` with negative numbers', () => {
      expect(compare(-2, -2)).toBe(DineroComparisonOperator.EQ);
    });
    it('returns `DineroComparisonOperator.EQ` with positive floats', () => {
      expect(compare(2.2, 2.2)).toBe(DineroComparisonOperator.EQ);
    });
    it('returns `DineroComparisonOperator.EQ` with negative floats', () => {
      expect(compare(-2.2, -2.2)).toBe(DineroComparisonOperator.EQ);
    });
    it('returns `DineroComparisonOperator.EQ` with a numbers in scientific notation', () => {
      expect(compare(2e5, 2e5)).toBe(DineroComparisonOperator.EQ);
    });
  });
});
