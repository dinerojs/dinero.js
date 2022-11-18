import { USD } from '@dinero.js/currencies';
import Big from 'big.js';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from 'test-utils';

import { toSnapshot } from '..';

describe('toSnapshot', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns an object literal with the right data', () => {
      const d = dinero({ amount: 500, currency: USD });

      expect(toSnapshot(d)).toEqual({
        amount: 500,
        currency: {
          code: 'USD',
          base: 10,
          exponent: 2,
        },
        scale: 2,
      });
    });

    it('uses a custom transformer', () => {
      const d = dinero({ amount: 500, currency: USD });

      expect(toSnapshot(d, ({ value }) => value.amount)).toBe(500);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns an object literal with the right data', () => {
      const d = dinero({ amount: 500n, currency: bigintUSD });

      expect(toSnapshot(d)).toEqual({
        amount: 500n,
        currency: {
          code: 'USD',
          base: 10n,
          exponent: 2n,
        },
        scale: 2n,
      });
    });

    it('uses a custom transformer', () => {
      const d = dinero({ amount: 500n, currency: bigintUSD });

      expect(toSnapshot(d, ({ value }) => value.amount)).toBe(500n);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns an object literal with the right data', () => {
      const d = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(toSnapshot(d)).toEqual({
        amount: new Big(500),
        currency: {
          code: 'USD',
          base: new Big(10),
          exponent: new Big(2),
        },
        scale: new Big(2),
      });
    });

    it('uses a custom transformer', () => {
      const amount = new Big(500);
      const d = dinero({ amount, currency: bigjsUSD });

      expect(toSnapshot(d, ({ value }) => value.amount)).toBe(amount);
    });
  });
});
