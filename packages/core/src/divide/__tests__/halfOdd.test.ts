import { calculator } from '@dinero.js/calculator-number';

import { halfOdd } from '../halfOdd';

describe('halfOdd', () => {
  describe('decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfOdd(14, 10, calculator)).toBe(1);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfOdd(-14, 10, calculator)).toBe(-1);
    });
    it('rounds to nearest odd integer with a positive half quotient rounding to an even integer', () => {
      expect(halfOdd(15, 10, calculator)).toBe(1);
    });
    it('rounds to nearest odd integer with a positive half quotient rounding to an odd integer', () => {
      expect(halfOdd(25, 10, calculator)).toBe(3);
    });
    it('rounds to nearest odd integer with a negative half quotient', () => {
      expect(halfOdd(-25, 10, calculator)).toBe(-3);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfOdd(16, 10, calculator)).toBe(2);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfOdd(-16, 10, calculator)).toBe(-2);
    });
  });
  describe('non-decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfOdd(22, 5, calculator)).toBe(4);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfOdd(-22, 5, calculator)).toBe(-4);
    });
    it('rounds to nearest odd integer with a positive half quotient rounding to an even integer', () => {
      expect(halfOdd(3, 2, calculator)).toBe(1);
    });
    it('rounds to nearest odd integer with a positive half quotient rounding to an odd integer', () => {
      expect(halfOdd(5, 2, calculator)).toBe(3);
    });
    it('rounds to nearest odd integer with a negative half quotient', () => {
      expect(halfOdd(-5, 2, calculator)).toBe(-3);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfOdd(24, 5, calculator)).toBe(5);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfOdd(-24, 5, calculator)).toBe(-5);
    });
  });
});
