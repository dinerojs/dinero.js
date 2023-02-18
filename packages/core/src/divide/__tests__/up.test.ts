import { calculator } from '@dinero.js/calculator-number';

import { up } from '../up';

describe('up', () => {
  describe('decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(up(20, 10, calculator)).toBe(2);
    });
    it('does not round with a negative integer quotient', () => {
      expect(up(-20, 10, calculator)).toBe(-2);
    });
    it('does not round with a zero quotient', () => {
      expect(up(0, 10, calculator)).toBe(0);
    });
    it('rounds up with a positive quotient below half', () => {
      expect(up(14, 10, calculator)).toBe(2);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(up(-14, 10, calculator)).toBe(-1);
    });
    it('rounds up with a positive half quotient', () => {
      expect(up(15, 10, calculator)).toBe(2);
    });
    it('rounds up with a negative half quotient', () => {
      expect(up(-15, 10, calculator)).toBe(-1);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(up(16, 10, calculator)).toBe(2);
    });
    it('rounds up with a negative quotient above half', () => {
      expect(up(-16, 10, calculator)).toBe(-1);
    });
  });
  describe('non-decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(up(20, 5, calculator)).toBe(4);
    });
    it('does not round with a negative integer quotient', () => {
      expect(up(-20, 5, calculator)).toBe(-4);
    });
    it('does not round with a zero quotient', () => {
      expect(up(0, 5, calculator)).toBe(0);
    });
    it('rounds up with a positive quotient below half', () => {
      expect(up(22, 5, calculator)).toBe(5);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(up(-22, 5, calculator)).toBe(-4);
    });
    it('rounds up with a positive half quotient', () => {
      expect(up(3, 2, calculator)).toBe(2);
    });
    it('rounds up with a negative half quotient', () => {
      expect(up(-3, 2, calculator)).toBe(-1);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(up(24, 5, calculator)).toBe(5);
    });
    it('rounds up with a negative quotient above half', () => {
      expect(up(-24, 5, calculator)).toBe(-4);
    });
  });
});
