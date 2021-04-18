import { USD, EUR } from '@dinero.js/currencies';
import { dinero, toSnapshot, subtract, unsafeSubtract } from '../../..';

describe('subtract', () => {
  describe('safe', () => {
    it('subtracts positive Dinero objects', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 400,
        currency: USD,
        scale: 2
      });
    });
    it('subtracts negative Dinero objects', () => {
      const d1 = dinero({ amount: -500, currency: USD });
      const d2 = dinero({ amount: -100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: -400,
        currency: USD,
        scale: 2
      });
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 4000,
        currency: USD,
        scale: 3,
      });
    });
    it("throws when using different currencies", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: EUR });

      expect(() => {
        subtract(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"Dinero objects don't have the same currency."`
      );
    });
  })
  describe("unsafe", () => {
    it('subtracts positive Dinero objects', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: USD });

      const snapshot = toSnapshot(unsafeSubtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 400,
        currency: USD,
        scale: 2,
      });
    });
    it('subtracts negative Dinero objects', () => {
      const d1 = dinero({ amount: -500, currency: USD });
      const d2 = dinero({ amount: -100, currency: USD });

      const snapshot = toSnapshot(unsafeSubtract(d1, d2));

      expect(snapshot).toEqual({
        amount: -400,
        currency: USD,
        scale: 2,
      });
    });
    it("doesn't normalize the scale, resulting in an incorrect operation", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(unsafeSubtract(d1, d2));

      expect(snapshot).toEqual({
        amount: -500,
        currency: USD,
        scale: 2,
      });
    });
    it("doesn't throw when using different currencies, resulting in an incorrect operation", () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: EUR });

      expect(() => unsafeSubtract(d1, d2)).not.toThrow();
      expect(toSnapshot(unsafeSubtract(d1, d2))).toEqual({
        amount: 400,
        currency: USD,
        scale: 2,
      });
    });
  })
});
