import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { haveSameAmount } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('haveSameAmount', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns true when amounts are equal', () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it('returns false when amounts are not equal', () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 2000, currency: USD });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
    it('returns true when amounts are equal once normalized', () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 10000, currency: USD, scale: 3 });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it('returns false when amounts are not equal once normalized', () => {
      const d1 = dinero({ amount: 10000, currency: USD });
      const d2 = dinero({ amount: 10000, currency: USD, scale: 3 });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns true when amounts are equal', () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it('returns false when amounts are not equal', () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 2000n, currency: bigintUSD });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
    it('returns true when amounts are equal once normalized', () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 10000n, currency: bigintUSD, scale: 3n });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it('returns false when amounts are not equal once normalized', () => {
      const d1 = dinero({ amount: 10000n, currency: bigintUSD });
      const d2 = dinero({ amount: 10000n, currency: bigintUSD, scale: 3n });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns true when amounts are equal', () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(1000), currency: bigjsUSD });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it('returns false when amounts are not equal', () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(2000), currency: bigjsUSD });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
    it('returns true when amounts are equal once normalized', () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(10000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it('returns false when amounts are not equal once normalized', () => {
      const d1 = dinero({ amount: new Big(10000), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(10000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
  });
});
