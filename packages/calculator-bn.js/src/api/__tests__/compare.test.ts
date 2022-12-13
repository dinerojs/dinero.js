import { ComparisonOperator } from '@dinero.js/core';
import BN from 'bn.js';

import { compare } from '../compare';

describe('compare', () => {
  describe('ComparisonOperator.LT', () => {
    it('returns `ComparisonOperator.LT` with positive numbers', () => {
      expect(compare(new BN(1), new BN(2))).toBe(ComparisonOperator.LT);
    });
    it('returns `ComparisonOperator.LT` with negative numbers', () => {
      expect(compare(new BN(-2), new BN(-1))).toBe(ComparisonOperator.LT);
    });
  });
  describe('ComparisonOperator.GT', () => {
    it('returns `ComparisonOperator.GT` with positive numbers', () => {
      expect(compare(new BN(2), new BN(1))).toBe(ComparisonOperator.GT);
    });
    it('returns `ComparisonOperator.GT` with negative numbers', () => {
      expect(compare(new BN(-1), new BN(-2))).toBe(ComparisonOperator.GT);
    });
  });
  describe('ComparisonOperator.EQ', () => {
    it('returns `ComparisonOperator.EQ` with positive numbers', () => {
      expect(compare(new BN(2), new BN(2))).toBe(ComparisonOperator.EQ);
    });
    it('returns `ComparisonOperator.EQ` with negative numbers', () => {
      expect(compare(new BN(-2), new BN(-2))).toBe(ComparisonOperator.EQ);
    });
  });
});
