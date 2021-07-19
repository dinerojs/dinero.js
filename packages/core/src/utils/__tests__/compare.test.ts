import { compare as cmp } from '@dinero.js/calculator-number';

import { compare } from '../compare';

const compareFn = compare({ compare: cmp });

describe('compare', () => {
  describe('inferiority', () => {
    it('returns -1 when the first number is less than the other with positive numbers', () => {
      expect(compareFn(1, 2)).toBe(-1);
    });
    it('returns -1 when the first number is less than the other with negative numbers', () => {
      expect(compareFn(-3, -2)).toBe(-1);
    });
    it('returns -1 when the first number is less than the other with floats', () => {
      expect(compareFn(1.2, 2.2)).toBe(-1);
    });
    it('returns -1 when the first number is less than the other with numbers in scientific notation', () => {
      expect(compareFn(2e5, 3e5)).toBe(-1);
    });
  });
  describe('equality', () => {
    it('returns 0 when the first number is equal to the other with positive numbers', () => {
      expect(compareFn(4, 4)).toBe(0);
    });
    it('returns 0 when the first number is equal to the other with negative numbers', () => {
      expect(compareFn(-2, -2)).toBe(0);
    });
    it('returns 0 when the first number is equal to the other with floats', () => {
      expect(compareFn(3.2, 3.2)).toBe(0);
    });
    it('returns 0 when the first number is equal to the other with numbers in scientific notation', () => {
      expect(compareFn(3e5, 3e5)).toBe(0);
    });
  });
  describe('superiority', () => {
    it('returns 1 when the first number is greater than the other with positive numbers', () => {
      expect(compareFn(4, 3)).toBe(1);
    });
    it('returns 1 when the first number is greater than the other with negative numbers', () => {
      expect(compareFn(-2, -3)).toBe(1);
    });
    it('returns 1 when the first number is greater than the other with floats', () => {
      expect(compareFn(3.2, 2.2)).toBe(1);
    });
    it('returns 1 when the first number is greater than the other with numbers in scientific notation', () => {
      expect(compareFn(3e5, 2e5)).toBe(1);
    });
  });
});
