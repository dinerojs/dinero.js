import { DineroComparisonOperator } from '../../../../core';

import { compare } from '../compare';

describe('compare', () => {
  describe('DineroComparisonOperator.LT', () => {
    it('returns `DineroComparisonOperator.LT` with positive numbers', () => {
      expect(compare(1n, 2n)).toBe(DineroComparisonOperator.LT);
    });
    it('returns `DineroComparisonOperator.LT` with negative numbers', () => {
      expect(compare(-2n, -1n)).toBe(DineroComparisonOperator.LT);
    });
  });
  describe('DineroComparisonOperator.GT', () => {
    it('returns `DineroComparisonOperator.GT` with positive numbers', () => {
      expect(compare(2n, 1n)).toBe(DineroComparisonOperator.GT);
    });
    it('returns `DineroComparisonOperator.GT` with negative numbers', () => {
      expect(compare(-1n, -2n)).toBe(DineroComparisonOperator.GT);
    });
  });
  describe('DineroComparisonOperator.EQ', () => {
    it('returns `DineroComparisonOperator.EQ` with positive numbers', () => {
      expect(compare(2n, 2n)).toBe(DineroComparisonOperator.EQ);
    });
    it('returns `DineroComparisonOperator.EQ` with negative numbers', () => {
      expect(compare(-2n, -2n)).toBe(DineroComparisonOperator.EQ);
    });
  });
});
