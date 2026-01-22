import { compare } from '../lib/es6/src/api/compare.js';

// ComparisonOperator constants
const LT = -1;
const EQ = 0;
const GT = 1;

describe('compare', () => {
  describe('ComparisonOperator.LT', () => {
    it('returns `ComparisonOperator.LT` with positive numbers', () => {
      expect(compare(1, 2)).toBe(LT);
    });
    it('returns `ComparisonOperator.LT` with negative numbers', () => {
      expect(compare(-2, -1)).toBe(LT);
    });
    it('returns `ComparisonOperator.LT` with positive floats', () => {
      expect(compare(1.2, 2.2)).toBe(LT);
    });
    it('returns `ComparisonOperator.LT` with negative floats', () => {
      expect(compare(-2.2, -1.2)).toBe(LT);
    });
    it('returns `ComparisonOperator.LT` with a numbers in scientific notation', () => {
      expect(compare(1e5, 2e5)).toBe(LT);
    });
  });
  describe('ComparisonOperator.GT', () => {
    it('returns `ComparisonOperator.GT` with positive numbers', () => {
      expect(compare(2, 1)).toBe(GT);
    });
    it('returns `ComparisonOperator.GT` with negative numbers', () => {
      expect(compare(-1, -2)).toBe(GT);
    });
    it('returns `ComparisonOperator.GT` with positive floats', () => {
      expect(compare(2.2, 1.2)).toBe(GT);
    });
    it('returns `ComparisonOperator.GT` with negative floats', () => {
      expect(compare(-1.2, -2.2)).toBe(GT);
    });
    it('returns `ComparisonOperator.GT` with a numbers in scientific notation', () => {
      expect(compare(2e5, 1e5)).toBe(GT);
    });
  });
  describe('ComparisonOperator.EQ', () => {
    it('returns `ComparisonOperator.EQ` with positive numbers', () => {
      expect(compare(2, 2)).toBe(EQ);
    });
    it('returns `ComparisonOperator.EQ` with negative numbers', () => {
      expect(compare(-2, -2)).toBe(EQ);
    });
    it('returns `ComparisonOperator.EQ` with positive floats', () => {
      expect(compare(2.2, 2.2)).toBe(EQ);
    });
    it('returns `ComparisonOperator.EQ` with negative floats', () => {
      expect(compare(-2.2, -2.2)).toBe(EQ);
    });
    it('returns `ComparisonOperator.EQ` with a numbers in scientific notation', () => {
      expect(compare(2e5, 2e5)).toBe(EQ);
    });
  });
});