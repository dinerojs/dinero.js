import { calculator } from '@dinero.js/calculator-number';

import { halfOdd } from '../halfOdd';

describe('halfOdd', () => {
  describe('decimal factors', () => {
    it('should not round positive integer quotients', () => {
      expect(halfOdd(20, 10, calculator)).toBe(2);
    });
    it('should not round negative integer quotients', () => {
      expect(halfOdd(-20, 10, calculator)).toBe(-2);
    });
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
    it('rounds to 1 with a positive quotient above half that is close to 0', () => {
      expect(halfOdd(6, 10, calculator)).toBe(1);
    });
    it('rounds to 1 with a positive half quotient that is close to 0', () => {
      expect(halfOdd(5, 10, calculator)).toBe(1);
    });
    it('rounds to 0 with a positive quotient and below half that is close to 0', () => {
      expect(halfOdd(4, 10, calculator)).toBe(0);
    });
    it('rounds to 0 with amount 1 and a positive quotient below half that is close to 0', () => {
      expect(halfOdd(1, 10, calculator)).toBe(0);
    });
    it('rounds to 0 when quotient is 0', () => {
      expect(halfOdd(0, 10, calculator)).toBe(0);
    });
    it('rounds to -0 with amount 1 and a negative quotient below half that is close to 0', () => {
      expect(halfOdd(-1, 10, calculator)).toBe(-0);
    });
    it('rounds to -0 with a negative quotient close to and below half, that is close to 0', () => {
      expect(halfOdd(-4, 10, calculator)).toBe(-0);
    });
    it('rounds to -1 with a negative half quotient that is close to 0', () => {
      expect(halfOdd(-5, 10, calculator)).toBe(-1);
    });
    it('rounds to -1 with a negative quotient above half, that is close to 0', () => {
      expect(halfOdd(-6, 10, calculator)).toBe(-1);
    });
  });
  describe('non-decimal factors', () => {
    it('should not round positive integer quotients', () => {
      expect(halfOdd(20, 5, calculator)).toBe(4);
    });
    it('should not round negative integer quotients', () => {
      expect(halfOdd(-20, 5, calculator)).toBe(-4);
    });
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
    it('rounds to 1 with a positive quotient above half that is close to 0', () => {
      expect(halfOdd(3, 5, calculator)).toBe(1);
    });
    it('rounds to 1 with a positive half quotient that is close to 0', () => {
      expect(halfOdd(3, 6, calculator)).toBe(1);
    });
    it('rounds to 0 with amount 1 and a positive quotient below half that is close to 0', () => {
      expect(halfOdd(1, 5, calculator)).toBe(0);
    });
    it('rounds to 0 when quotient is 0', () => {
      expect(halfOdd(0, 5, calculator)).toBe(0);
    });
    it('rounds to -0 with amount -1 and a negative quotient below half that is close to 0', () => {
      expect(halfOdd(-1, 5, calculator)).toBe(-0);
    });
    it('rounds to -1 with a negative half quotient that is close to 0', () => {
      expect(halfOdd(-3, 6, calculator)).toBe(-1);
    });
    it('rounds to -1 with a negative quotient above half that is close to 0', () => {
      expect(halfOdd(-3, 5, calculator)).toBe(-1);
    });
  });
});
