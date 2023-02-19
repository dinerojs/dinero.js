import { calculator } from '@dinero.js/calculator-number';

import { down } from '../down';

describe('down', () => {
  describe('decimal factors', () => {
    it('should not round positive integer quotients', () => {
      expect(down(20, 10, calculator)).toBe(2);
    });
    it('should not round negative integer quotients', () => {
      expect(down(-20, 10, calculator)).toBe(-2);
    });
    it('rounds down with a positive quotient below half', () => {
      expect(down(14, 10, calculator)).toBe(1);
    });
    it('rounds down with a negative quotient below half', () => {
      expect(down(-14, 10, calculator)).toBe(-2);
    });
    it('rounds down with a positive half quotient', () => {
      expect(down(15, 10, calculator)).toBe(1);
    });
    it('rounds down with a negative half quotient', () => {
      expect(down(-15, 10, calculator)).toBe(-2);
    });
    it('rounds down with a positive quotient above half', () => {
      expect(down(16, 10, calculator)).toBe(1);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(down(-16, 10, calculator)).toBe(-2);
    });
    it('rounds to 0 with a positive quotient above half that is close to 0', () => {
      expect(down(6, 10, calculator)).toBe(0);
    });
    it('rounds to 0 with a positive half quotient that is close to 0', () => {
      expect(down(5, 10, calculator)).toBe(0);
    });
    it('rounds to 0 with a positive quotient and below half that is close to 0', () => {
      expect(down(4, 10, calculator)).toBe(0);
    });
    it('rounds to 0 with amount 1 and a positive quotient below half that is close to 0', () => {
      expect(down(1, 10, calculator)).toBe(0);
    });
    it('rounds to 0 when quotient is 0', () => {
      expect(down(0, 10, calculator)).toBe(0);
    });
    it('rounds to -1 with amount 1 and a negative quotient below half that is close to 0', () => {
      expect(down(-1, 10, calculator)).toBe(-1);
    });
    it('rounds to -1 with a negative quotient close to and below half, that is close to 0', () => {
      expect(down(-4, 10, calculator)).toBe(-1);
    });
    it('rounds to -1 with a negative half quotient that is close to 0', () => {
      expect(down(-5, 10, calculator)).toBe(-1);
    });
    it('rounds to -1 with a negative quotient above half, that is close to 0', () => {
      expect(down(-6, 10, calculator)).toBe(-1);
    });
  });
  describe('non-decimal factors', () => {
    it('should not round positive integer quotients', () => {
      expect(down(20, 5, calculator)).toBe(4);
    });
    it('should not round negative integer quotients', () => {
      expect(down(-20, 5, calculator)).toBe(-4);
    });
    it('rounds down with a positive quotient below half', () => {
      expect(down(22, 5, calculator)).toBe(4);
    });
    it('rounds down with a negative quotient below half', () => {
      expect(down(-22, 5, calculator)).toBe(-5);
    });
    it('rounds down with a positive half quotient', () => {
      expect(down(3, 2, calculator)).toBe(1);
    });
    it('rounds down with a negative half quotient', () => {
      expect(down(-3, 2, calculator)).toBe(-2);
    });
    it('rounds down with a positive quotient above half', () => {
      expect(down(24, 5, calculator)).toBe(4);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(down(-24, 5, calculator)).toBe(-5);
    });
    it('rounds to 0 with a positive quotient above half that is close to 0', () => {
      expect(down(3, 5, calculator)).toBe(0);
    });
    it('rounds to 0 with a positive half quotient that is close to 0', () => {
      expect(down(3, 6, calculator)).toBe(0);
    });
    it('rounds to 0 with amount 1 and a positive quotient below half that is close to 0', () => {
      expect(down(1, 5, calculator)).toBe(0);
    });
    it('rounds to 0 when quotient is 0', () => {
      expect(down(0, 5, calculator)).toBe(0);
    });
    it('rounds to -1 with amount -1 and a negative quotient below half that is close to 0', () => {
      expect(down(-1, 5, calculator)).toBe(-1);
    });
    it('rounds to -1 with a negative half quotient that is close to 0', () => {
      expect(down(-3, 6, calculator)).toBe(-1);
    });
    it('rounds to -1 with a negative quotient above half that is close to 0', () => {
      expect(down(-3, 5, calculator)).toBe(-1);
    });
  });
});
