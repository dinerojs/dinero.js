import { EUR, USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { greaterThanOrEqual } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('greaterThanOrEqual', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

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
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it('returns false when the first amount is less than the other', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 800n, currency: bigintUSD });

      expect(greaterThanOrEqual(d1, d2)).toBe(false);
    });
    it('returns true when amounts are equal', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintUSD });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('returns true when the first amount is greater than the other', () => {
      const d1 = dinero({ amount: 800n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintUSD });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 800n, currency: bigintUSD });
      const d2 = dinero({ amount: 5000n, currency: bigintUSD, scale: 3n });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 800n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintEUR });

      expect(() => {
        greaterThanOrEqual(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it('returns false when the first amount is less than the other', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

      expect(greaterThanOrEqual(d1, d2)).toBe(false);
    });
    it('returns true when amounts are equal', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('returns true when the first amount is greater than the other', () => {
      const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(5000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(greaterThanOrEqual(d1, d2)).toBe(true);
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsEUR });

      expect(() => {
        greaterThanOrEqual(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
});
