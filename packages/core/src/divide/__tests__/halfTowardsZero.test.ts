import { calculator } from '@dinero.js/calculator-number';

import { halfTowardsZero } from '../halfTowardsZero';

describe('halfTowardsZero', () => {
  describe('decimal factors', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfTowardsZero(14, 10, calculator)).toBe(1);
    });
    it('rounds up with a negative float below half', () => {
      expect(halfTowardsZero(-14, 10, calculator)).toBe(-1);
    });
    it('rounds to the nearest integer towards zero with a positive half float', () => {
      expect(halfTowardsZero(15, 10, calculator)).toBe(1);
    });
    it('rounds to the nearest integer towards zero with a negative half float', () => {
      expect(halfTowardsZero(-25, 10, calculator)).toBe(-2);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfTowardsZero(16, 10, calculator)).toBe(2);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfTowardsZero(-16, 10, calculator)).toBe(-2);
    });
  });
  describe('non-decimal factors', () => {
    it('rounds down with a positive float below half', () => {
      expect(halfTowardsZero(22, 5, calculator)).toBe(4);
    });
    it('rounds up with a negative float below half', () => {
      expect(halfTowardsZero(-22, 5, calculator)).toBe(-4);
    });
    it('rounds to the nearest integer towards zero with a positive half float', () => {
      expect(halfTowardsZero(3, 2, calculator)).toBe(1);
    });
    it('rounds to the nearest integer towards zero with a negative half float', () => {
      expect(halfTowardsZero(-5, 2, calculator)).toBe(-2);
    });
    it('rounds up with a positive float above half', () => {
      expect(halfTowardsZero(24, 5, calculator)).toBe(5);
    });
    it('rounds down with a negative float above half', () => {
      expect(halfTowardsZero(-24, 5, calculator)).toBe(-5);
    });
  });
});
