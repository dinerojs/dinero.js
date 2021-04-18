import { USD, EUR } from '@dinero.js/currencies';
import { dinero, greaterThanOrEqual, unsafeGreaterThanOrEqual } from '../../..';

describe('greaterThanOrEqual', () => {
  describe('safe', () => {
    it('returns false when the first amount is less than the other', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 800, currency: USD });

      expect(greaterThanOrEqual(d1, d2)).toBe(false);
    });
    it('returns true when amounts are equal', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('returns true when the first amount is greater than the other', () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 5000, currency: USD, scale: 3 });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 500, currency: EUR });

      expect(() => {
        greaterThanOrEqual(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"Dinero objects don't have the same currency."`
      );
    });
  });
  describe('unsafe', () => {
    it('returns false when the first amount is less than the other', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 800, currency: USD });

      expect(unsafeGreaterThanOrEqual(d1, d2)).toBe(false);
    });
    it('returns true when amounts are equal', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      expect(unsafeGreaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('returns true when the first amount is greater than the other', () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      expect(unsafeGreaterThanOrEqual(d1, d2)).toBe(true);
    });
    it("doesn't normalize the result to the highest scale, resulting in an incorrect comparison", () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 5000, currency: USD, scale: 3 });

      expect(unsafeGreaterThanOrEqual(d1, d2)).toBe(false);
    });
    it("doesn't throw when using different currencies, resulting in an incorrect comparison", () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 500, currency: EUR });

      expect(() => unsafeGreaterThanOrEqual(d1, d2)).not.toThrow();
      expect(unsafeGreaterThanOrEqual(d1, d2)).toBe(true);
    });
  });
});
