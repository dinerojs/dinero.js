import { calculator } from '@dinero.js/calculator-number';

import { halfDown } from '../halfDown';

describe('halfDown', () => {
  describe('decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfDown(14, 10, calculator)).toBe(1);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfDown(-14, 10, calculator)).toBe(-1);
    });
    it('rounds down with a positive half quotient', () => {
      expect(halfDown(15, 10, calculator)).toBe(1);
    });
    it('rounds down with a negative half quotient', () => {
      expect(halfDown(-15, 10, calculator)).toBe(-2);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfDown(16, 10, calculator)).toBe(2);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfDown(-16, 10, calculator)).toBe(-2);
    });
  });
  describe('non-decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfDown(22, 5, calculator)).toBe(4);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfDown(-22, 5, calculator)).toBe(-4);
    });
    it('rounds down with a positive half quotient', () => {
      expect(halfDown(3, 2, calculator)).toBe(1);
    });
    it('rounds down with a negative half quotient', () => {
      expect(halfDown(-3, 2, calculator)).toBe(-2);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfDown(24, 5, calculator)).toBe(5);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfDown(-24, 5, calculator)).toBe(-5);
    });
  });
});
