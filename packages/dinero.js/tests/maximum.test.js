import { eur as EUR, usd as USD } from '@dinero.js/currencies';
import Big from 'big.js';
import { castToBigintCurrency } from '../lib/es6/src/test-utils/castToBigintCurrency.js';
import { castToBigjsCurrency } from '../lib/es6/src/test-utils/castToBigjsCurrency.js';
import { createNumberDinero } from '../lib/es6/src/test-utils/createNumberDinero.js';
import { createBigintDinero } from '../lib/es6/src/test-utils/createBigintDinero.js';
import { createBigjsDinero } from '../lib/es6/src/test-utils/createBigjsDinero.js';

import { maximum, toSnapshot } from '..';

describe('maximum', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns the greatest from a set of Dinero objects', () => {
      const d1 = dinero({ amount: 150, currency: USD });
      const d2 = dinero({ amount: 50, currency: USD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 150,
        currency: USD,
        scale: 2,
      });
    });
    it('returns the greatest from a set of Dinero objects after normalization', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 5000,
        currency: USD,
        scale: 3,
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 150, currency: USD });
      const d2 = dinero({ amount: 50, currency: EUR });

      expect(() => {
        maximum([d1, d2]);
      }).toThrowErrorMatchingInlineSnapshot(
        `[Error: Objects must have the same currency.]`
      );
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it('returns the greatest from a set of Dinero objects', () => {
      const d1 = dinero({ amount: 150n, currency: bigintUSD });
      const d2 = dinero({ amount: 50n, currency: bigintUSD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 150n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('returns the greatest from a set of Dinero objects after normalization', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 5000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 150n, currency: bigintUSD });
      const d2 = dinero({ amount: 50n, currency: bigintEUR });

      expect(() => {
        maximum([d1, d2]);
      }).toThrowErrorMatchingInlineSnapshot(
        `[Error: Objects must have the same currency.]`
      );
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it('returns the greatest from a set of Dinero objects', () => {
      const d1 = dinero({ amount: new Big(150), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(50), currency: bigjsUSD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: new Big(150),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it('returns the greatest from a set of Dinero objects after normalization', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: new Big(5000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: new Big(150), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(50), currency: bigjsEUR });

      expect(() => {
        maximum([d1, d2]);
      }).toThrowErrorMatchingInlineSnapshot(
        `[Error: Objects must have the same currency.]`
      );
    });
  });
});
