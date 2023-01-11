import { calculator } from '@dinero.js/calculator-number';

import { halfTowardsZero } from '../halfTowardsZero';

describe('halfTowardsZero', () => {
  describe('decimal factors', () => {
    it('should not round positive integer quotients', () => {
      expect(halfTowardsZero(20, 10, calculator)).toBe(2);
    });
    it('should not round negative integer quotients', () => {
      expect(halfTowardsZero(-20, 10, calculator)).toBe(-2);
    });
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
    it('rounds to 1 with a positive quotient above half that is close to 0', () => {
      expect(halfTowardsZero(6, 10, calculator)).toBe(1);
    });
    it('rounds to 0 with a positive half quotient that is close to 0', () => {
      expect(halfTowardsZero(5, 10, calculator)).toBe(0);
    });
    it('rounds to 0 with a positive quotient and below half that is close to 0', () => {
      expect(halfTowardsZero(4, 10, calculator)).toBe(0);
    });
    it('rounds to 0 with amount 1 and a positive quotient below half that is close to 0', () => {
      expect(halfTowardsZero(1, 10, calculator)).toBe(0);
    });
    it('rounds to 0 when quotient is 0', () => {
      expect(halfTowardsZero(0, 10, calculator)).toBe(0);
    });
    it('rounds to -0 with amount 1 and a negative quotient below half that is close to 0', () => {
      expect(halfTowardsZero(-1, 10, calculator)).toBe(-0);
    });
    it('rounds to -0 with a negative quotient close to and below half, that is close to 0', () => {
      expect(halfTowardsZero(-4, 10, calculator)).toBe(-0);
    });
    it('rounds to -0 with a negative half quotient that is close to 0', () => {
      expect(halfTowardsZero(-5, 10, calculator)).toBe(-0);
    });
    it('rounds to -1 with a negative quotient above half, that is close to 0', () => {
      expect(halfTowardsZero(-6, 10, calculator)).toBe(-1);
    });
  });
  describe('non-decimal factors', () => {
    it('should not round positive integer quotients', () => {
      expect(halfTowardsZero(20, 5, calculator)).toBe(4);
    });
    it('should not round negative integer quotients', () => {
      expect(halfTowardsZero(-20, 5, calculator)).toBe(-4);
    });
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
    it('rounds to 1 with a positive quotient above half that is close to 0', () => {
      expect(halfTowardsZero(3, 5, calculator)).toBe(1);
    });
    it('rounds to 0 with a positive half quotient that is close to 0', () => {
      expect(halfTowardsZero(3, 6, calculator)).toBe(0);
    });
    it('rounds to 0 with amount 1 and a positive quotient below half that is close to 0', () => {
      expect(halfTowardsZero(1, 5, calculator)).toBe(0);
    });
    it('rounds to 0 when quotient is 0', () => {
      expect(halfTowardsZero(0, 5, calculator)).toBe(0);
    });
    it('rounds to -0 with amount -1 and a negative quotient below half that is close to 0', () => {
      expect(halfTowardsZero(-1, 5, calculator)).toBe(-0);
    });
    it('rounds to -0 with a negative half quotient that is close to 0', () => {
      expect(halfTowardsZero(-3, 6, calculator)).toBe(-0);
    });
    it('rounds to -1 with a negative quotient above half that is close to 0', () => {
      expect(halfTowardsZero(-3, 5, calculator)).toBe(-1);
    });
  });
});
