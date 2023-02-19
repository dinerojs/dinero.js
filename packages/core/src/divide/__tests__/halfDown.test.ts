import { calculator } from '@dinero.js/calculator-number';
import * as fc from 'fast-check';

import { halfDown } from '../halfDown';

describe('halfDown', () => {
  describe('decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(halfDown(20, 10, calculator)).toBe(2);
    });
    it('does not round with a negative integer quotient', () => {
      expect(halfDown(-20, 10, calculator)).toBe(-2);
    });
    it('does not round with a zero quotient', () => {
      expect(halfDown(0, 10, calculator)).toBe(0);
    });
    it('rounds down with a positive half quotient', () => {
      expect(halfDown(15, 10, calculator)).toBe(1);
    });
    it('rounds down with a negative half quotient', () => {
      expect(halfDown(-15, 10, calculator)).toBe(-2);
    });
    it('rounds up with any positive float quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 6, max: 9 }), (a) => {
          expect(halfDown(a, 10, calculator)).toBe(1);
        })
      );
    });
    it('rounds down with any negative quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -9, max: -6 }), (a) => {
          expect(halfDown(a, 10, calculator)).toBe(-1);
        })
      );
    });
    it('rounds down with any positive float quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 4 }), (a) => {
          expect(halfDown(a, 10, calculator)).toBe(0);
        })
      );
    });
    it('rounds up with any negative quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -4, max: -1 }), (a) => {
          expect(halfDown(a, 10, calculator)).toBe(-0);
        })
      );
    });
  });
  describe('non-decimal factors', () => {
    it('does not round with a positive integer quotient', () => {
      expect(halfDown(20, 5, calculator)).toBe(4);
    });
    it('does not round with a negative integer quotient', () => {
      expect(halfDown(-20, 5, calculator)).toBe(-4);
    });
    it('does not round with a zero quotient', () => {
      expect(halfDown(0, 5, calculator)).toBe(0);
    });
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
    it('rounds up with any positive float quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 3, max: 4 }), (a) => {
          expect(halfDown(a, 5, calculator)).toBe(1);
        })
      );
    });
    it('rounds down with any negative quotient above half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -4, max: -3 }), (a) => {
          expect(halfDown(a, 5, calculator)).toBe(-1);
        })
      );
    });
    it('rounds down with any positive float quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 2 }), (a) => {
          expect(halfDown(a, 5, calculator)).toBe(0);
        })
      );
    });
    it('rounds up with any negative quotient below half', () => {
      fc.assert(
        fc.property(fc.integer({ min: -2, max: -1 }), (a) => {
          expect(halfDown(a, 5, calculator)).toBe(-0);
        })
      );
    });
  });
});
