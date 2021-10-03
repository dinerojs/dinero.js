import { calculator } from '@dinero.js/calculator-number';

import { down } from '../down';

describe('down', () => {
  describe('decimal factors', () => {
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
  });
  describe('non-decimal factors', () => {
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
  });
});
