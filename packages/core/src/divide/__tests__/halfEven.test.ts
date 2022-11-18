import { calculator } from '@dinero.js/calculator-number';

import { halfEven } from '../halfEven';

describe('halfEven', () => {
  describe('decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfEven(14, 10, calculator)).toBe(1);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfEven(-14, 10, calculator)).toBe(-1);
    });
    it('rounds to nearest even integer with a positive half quotient rounding to an even integer', () => {
      expect(halfEven(15, 10, calculator)).toBe(2);
    });
    it('rounds to nearest even integer with a positive half quotient rounding to an odd integer', () => {
      expect(halfEven(25, 10, calculator)).toBe(2);
    });
    it('rounds to nearest even integer with a negative half quotient', () => {
      expect(halfEven(-25, 10, calculator)).toBe(-2);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfEven(16, 10, calculator)).toBe(2);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfEven(-16, 10, calculator)).toBe(-2);
    });
  });
  describe('non-decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfEven(22, 5, calculator)).toBe(4);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfEven(-22, 5, calculator)).toBe(-4);
    });
    it('rounds to nearest even integer with a positive half quotient rounding to an even integer', () => {
      expect(halfEven(3, 2, calculator)).toBe(2);
    });
    it('rounds to nearest even integer with a positive half quotient rounding to an odd integer', () => {
      expect(halfEven(5, 2, calculator)).toBe(2);
    });
    it('rounds to nearest even integer with a negative half quotient', () => {
      expect(halfEven(-5, 2, calculator)).toBe(-2);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfEven(24, 5, calculator)).toBe(5);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfEven(-24, 5, calculator)).toBe(-5);
    });
  });
});
