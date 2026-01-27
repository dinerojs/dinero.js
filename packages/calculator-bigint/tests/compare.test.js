import { compare } from '../lib/es6/src/api/compare.js';

describe('compare', () => {
  describe('LT', () => {
    it('returns LT with positive numbers', () => {
      const result = compare(1n, 2n);
      expect(result).toBe(-1);
    });
    it('returns LT with negative numbers', () => {
      const result = compare(-2n, -1n);
      expect(result).toBe(-1);
    });
  });
  describe('GT', () => {
    it('returns GT with positive numbers', () => {
      const result = compare(2n, 1n);
      expect(result).toBe(1);
    });
    it('returns GT with negative numbers', () => {
      const result = compare(-1n, -2n);
      expect(result).toBe(1);
    });
  });
  describe('EQ', () => {
    it('returns EQ with positive numbers', () => {
      const result = compare(2n, 2n);
      expect(result).toBe(0);
    });
    it('returns EQ with negative numbers', () => {
      const result = compare(-2n, -2n);
      expect(result).toBe(0);
    });
  });
});