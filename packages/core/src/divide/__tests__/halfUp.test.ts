import { calculator } from '@dinero.js/calculator-number';
import * as fc from 'fast-check';

import { halfUp } from '../halfUp';

describe('halfUp', () => {
  describe('decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(halfUp(20, 10, calculator)).toBe(2);
    });
    it('does not round with a negative integer quotient', () => {
      expect(halfUp(-20, 10, calculator)).toBe(-2);
    });
    it('does not round with a zero quotient', () => {
      expect(halfUp(0, 10, calculator)).toBe(0);
    });
    it('rounds up with a positive half quotient', () => {
      expect(halfUp(15, 10, calculator)).toBe(2);
    });
    it('rounds up with a negative half quotient', () => {
      expect(halfUp(-15, 10, calculator)).toBe(-1);
    });
    it('rounds up with any positive float quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 6, max: 9 }), (a) => {
          expect(halfUp(a, 10, calculator)).toBe(1);
        })
      );
    });
    it('rounds down with any negative float quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -9, max: -6 }), (a) => {
          expect(halfUp(a, 10, calculator)).toBe(-1);
        })
      );
    });
    it('rounds down with any positive float quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 4 }), (a) => {
          expect(halfUp(a, 10, calculator)).toBe(0);
        })
      );
    });
    it('rounds up with any negative float quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -4, max: -1 }), (a) => {
          expect(halfUp(a, 10, calculator)).toBe(-0);
        })
      );
    });
  });
  describe('non-decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(halfUp(20, 5, calculator)).toBe(4);
    });
    it('does not round with a negative integer quotient', () => {
      expect(halfUp(-20, 5, calculator)).toBe(-4);
    });
    it('does not round with a zero quotient', () => {
      expect(halfUp(0, 5, calculator)).toBe(0);
    });
    it('rounds up with a positive half quotient', () => {
      expect(halfUp(3, 2, calculator)).toBe(2);
    });
    it('rounds up with a negative half quotient', () => {
      expect(halfUp(-3, 2, calculator)).toBe(-1);
    });
    it('rounds up with any positive float quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 3, max: 4 }), (a) => {
          expect(halfUp(a, 5, calculator)).toBe(1);
        })
      );
    });
    it('rounds down with any negative float quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -4, max: -3 }), (a) => {
          expect(halfUp(a, 5, calculator)).toBe(-1);
        })
      );
    });
    it('rounds down with any positive float quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 2 }), (a) => {
          expect(halfUp(a, 5, calculator)).toBe(0);
        })
      );
    });
    it('rounds up with any negative float quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -2, max: -1 }), (a) => {
          expect(halfUp(a, 5, calculator)).toBe(-0);
        })
      );
    });
  });
});
