import { calculator } from '@dinero.js/calculator-number';

import { halfAwayFromZero } from '../halfAwayFromZero';

describe('halfAwayFromZero', () => {
  describe('decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfAwayFromZero(14, 10, calculator)).toBe(1);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfAwayFromZero(-14, 10, calculator)).toBe(-1);
    });
    it('rounds to the nearest integer away from zero with a positive half quotient', () => {
      expect(halfAwayFromZero(15, 10, calculator)).toBe(2);
    });
    it('rounds to the nearest integer away from zero with a negative half quotient', () => {
      expect(halfAwayFromZero(-25, 10, calculator)).toBe(-3);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfAwayFromZero(16, 10, calculator)).toBe(2);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfAwayFromZero(-16, 10, calculator)).toBe(-2);
    });
  });
  describe('non-decimal factors', () => {
    it('rounds down with a positive quotient below half', () => {
      expect(halfAwayFromZero(22, 5, calculator)).toBe(4);
    });
    it('rounds up with a negative quotient below half', () => {
      expect(halfAwayFromZero(-22, 5, calculator)).toBe(-4);
    });
    it('rounds to the nearest integer away from zero with a positive half quotient', () => {
      expect(halfAwayFromZero(3, 2, calculator)).toBe(2);
    });
    it('rounds to the nearest integer away from zero with a negative half quotient', () => {
      expect(halfAwayFromZero(-5, 2, calculator)).toBe(-3);
    });
    it('rounds up with a positive quotient above half', () => {
      expect(halfAwayFromZero(24, 5, calculator)).toBe(5);
    });
    it('rounds down with a negative quotient above half', () => {
      expect(halfAwayFromZero(-24, 5, calculator)).toBe(-5);
    });
  });
});
