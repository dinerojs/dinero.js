import { EUR, USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { lessThan } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('lessThan', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns true when the first amount is less than the other', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 800, currency: USD });

      expect(lessThan(d1, d2)).toBe(true);
    });
    it('returns false when amounts are equal', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      expect(lessThan(d1, d2)).toBe(false);
    });
    it('returns false when the first amount is greater than the other', () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 500, currency: USD });

      expect(lessThan(d1, d2)).toBe(false);
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 5000, currency: USD, scale: 3 });
      const d2 = dinero({ amount: 800, currency: USD });

      expect(lessThan(d1, d2)).toBe(true);
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 800, currency: USD });
      const d2 = dinero({ amount: 500, currency: EUR });

      expect(() => {
        lessThan(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it('returns true when the first amount is less than the other', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 800n, currency: bigintUSD });

      expect(lessThan(d1, d2)).toBe(true);
    });
    it('returns false when amounts are equal', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintUSD });

      expect(lessThan(d1, d2)).toBe(false);
    });
    it('returns false when the first amount is greater than the other', () => {
      const d1 = dinero({ amount: 800n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintUSD });

      expect(lessThan(d1, d2)).toBe(false);
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 5000n, currency: bigintUSD, scale: 3n });
      const d2 = dinero({ amount: 800n, currency: bigintUSD });

      expect(lessThan(d1, d2)).toBe(true);
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 800n, currency: bigintUSD });
      const d2 = dinero({ amount: 500n, currency: bigintEUR });

      expect(() => {
        lessThan(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it('returns true when the first amount is less than the other', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

      expect(lessThan(d1, d2)).toBe(true);
    });
    it('returns false when amounts are equal', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(lessThan(d1, d2)).toBe(false);
    });
    it('returns false when the first amount is greater than the other', () => {
      const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(lessThan(d1, d2)).toBe(false);
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({
        amount: new Big(5000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
      const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

      expect(lessThan(d1, d2)).toBe(true);
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(500), currency: bigjsEUR });

      expect(() => {
        lessThan(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
});
