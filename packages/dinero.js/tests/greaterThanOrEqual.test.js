import { eur as EUR, usd as USD } from '@dinero.js/currencies';
import Big from 'big.js';
import { castToBigintCurrency } from '../lib/es6/src/test-utils/castToBigintCurrency.js';
import { castToBigjsCurrency } from '../lib/es6/src/test-utils/castToBigjsCurrency.js';
import { createNumberDinero } from '../lib/es6/src/test-utils/createNumberDinero.js';
import { createBigintDinero } from '../lib/es6/src/test-utils/createBigintDinero.js';
import { createBigjsDinero } from '../lib/es6/src/test-utils/createBigjsDinero.js';

import { greaterThanOrEqual } from '..';

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
        `[Error: Objects must have the same currency.]`
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
        `[Error: Objects must have the same currency.]`
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
        `[Error: Objects must have the same currency.]`
      );
    });
  });
});
