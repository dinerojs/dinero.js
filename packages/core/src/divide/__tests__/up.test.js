import { calculator } from '@dinero.js/calculator-number';
import * as fc from 'fast-check';

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
    it('rounds up with a positive half quotient', () => {
      expect(up(15, 10, calculator)).toBe(2);
    });
    it('rounds up with a negative half quotient', () => {
      expect(up(-15, 10, calculator)).toBe(-1);
    });
    it('rounds up with any positive float quotient', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 9 }), (a) => {
          expect(up(a, 10, calculator)).toBe(1);
        })
      );
    });
    it('rounds up with any negative float quotient', () => {
      fc.assert(
        fc.property(fc.integer({ min: -9, max: -1 }), (a) => {
          expect(up(a, 10, calculator)).toBe(-0);
        })
      );
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
    it('rounds up with a positive half quotient', () => {
      expect(up(3, 2, calculator)).toBe(2);
    });
    it('rounds up with a negative half quotient', () => {
      expect(up(-3, 2, calculator)).toBe(-1);
    });
    it('rounds up with any positive float quotient', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 4 }), (a) => {
          expect(up(a, 5, calculator)).toBe(1);
        })
      );
    });
    it('rounds up with any negative float quotient', () => {
      fc.assert(
        fc.property(fc.integer({ min: -4, max: -1 }), (a) => {
          expect(up(a, 5, calculator)).toBe(-0);
        })
      );
    });
  });
});
