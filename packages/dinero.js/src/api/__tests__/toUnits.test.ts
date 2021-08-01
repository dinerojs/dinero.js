import { USD } from '@dinero.js/currencies';

import { dinero, toUnits } from '../../..';

describe('toUnits', () => {
  describe('decimal currencies', () => {
    it('returns the amount in currency units', () => {
      const d = dinero({ amount: 1050, currency: USD });

      expect(toUnits(d)).toEqual([10, 50]);
    });
    it('returns the amount in currency units, based on a custom scale', () => {
      const d = dinero({ amount: 10545, currency: USD, scale: 3 });

      expect(toUnits(d)).toEqual([10, 545]);
    });
    it('returns the amount in currency units, with a single trailing zero', () => {
      const d = dinero({ amount: 1000, currency: USD });

      expect(toUnits(d)).toEqual([10, 0]);
    });
  });
  describe('non-decimal currencies', () => {
    it('returns the amount in currency units', () => {
      const GRD = { code: 'GRD', base: 6, exponent: 1 };
      const d = dinero({ amount: 9, currency: GRD });

      expect(toUnits(d)).toEqual([1, 3]);
    });
    it('handles currencies with multiple subdivisions', () => {
      const GBP = { code: 'GBP', base: [20, 12], exponent: 1 };
      const d = dinero({ amount: 267, currency: GBP });

      expect(toUnits(d)).toEqual([1, 2, 3]);
    });
    it('handles intermediary zero values', () => {
      const GBP = { code: 'GBP', base: [20, 12], exponent: 1 };
      const d = dinero({ amount: 2, currency: GBP });

      expect(toUnits(d)).toEqual([0, 0, 2]);
    });
  });
});
