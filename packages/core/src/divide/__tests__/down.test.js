import { calculator } from '@dinero.js/calculator-number';
import * as fc from 'fast-check';

import { down } from '../down';

describe('down', () => {
  describe('decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(down(20, 10, calculator)).toBe(2);
    });
    it('does not round with a negative integer quotient', () => {
      expect(down(-20, 10, calculator)).toBe(-2);
    });
    it('does not round with a zero quotient', () => {
      expect(down(0, 10, calculator)).toBe(0);
    });
    it('rounds down with a positive half quotient', () => {
      expect(down(15, 10, calculator)).toBe(1);
    });
    it('rounds down with a negative half quotient', () => {
      expect(down(-15, 10, calculator)).toBe(-2);
    });
    it('rounds down with any positive float quotient', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 9 }), (a) => {
          expect(down(a, 10, calculator)).toBe(0);
        })
      );
    });
    it('rounds down with any negative float quotient', () => {
      fc.assert(
        fc.property(fc.integer({ min: -9, max: -1 }), (a) => {
          expect(down(a, 10, calculator)).toBe(-1);
        })
      );
    });
  });
  describe('non-decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(down(20, 5, calculator)).toBe(4);
    });
    it('does not round with a negative integer quotient', () => {
      expect(down(-20, 5, calculator)).toBe(-4);
    });
    it('does not round with a zero quotient', () => {
      expect(down(0, 5, calculator)).toBe(0);
    });
    it('rounds down with a positive half quotient', () => {
      expect(down(3, 2, calculator)).toBe(1);
    });
    it('rounds down with a negative half quotient', () => {
      expect(down(-3, 2, calculator)).toBe(-2);
    });
    it('rounds down with any positive float', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 4 }), (a) => {
          expect(down(a, 5, calculator)).toBe(0);
        })
      );
    });
    it('rounds down with any negative float', () => {
      fc.assert(
        fc.property(fc.integer({ min: -4, max: -1 }), (a) => {
          expect(down(a, 5, calculator)).toBe(-1);
        })
      );
    });
  });
});
