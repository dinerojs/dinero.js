import { calculator } from '@dinero.js/calculator-number';

import { up } from '../up';

describe('up', () => {
  describe('decimal factors', () => {
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
