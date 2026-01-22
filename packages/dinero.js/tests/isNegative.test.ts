import { USD } from '@dinero.js/currencies';
import Big from 'big.js';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from 'test-utils';

import { isNegative } from '..';

describe('isNegative', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns true when amount is less than 0', () => {
      const d = dinero({ amount: -100, currency: USD });

      expect(isNegative(d)).toBe(true);
    });
    it('returns false when amount is greater than 0', () => {
      const d = dinero({ amount: 100, currency: USD });

      expect(isNegative(d)).toBe(false);
    });
    it('returns false when amount is equal to 0', () => {
      const d1 = dinero({ amount: 0, currency: USD });
      const d2 = dinero({ amount: -0, currency: USD });

      expect(isNegative(d1)).toBe(false);
      expect(isNegative(d2)).toBe(false);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns true when amount is less than 0', () => {
      const d = dinero({ amount: -100n, currency: bigintUSD });

      expect(isNegative(d)).toBe(true);
    });
    it('returns false when amount is greater than 0', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });

      expect(isNegative(d)).toBe(false);
    });
    it('returns false when amount is equal to 0', () => {
      const d1 = dinero({ amount: 0n, currency: bigintUSD });
      const d2 = dinero({ amount: -0n, currency: bigintUSD });

      expect(isNegative(d1)).toBe(false);
      expect(isNegative(d2)).toBe(false);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns true when amount is less than 0', () => {
      const d = dinero({ amount: new Big(-100), currency: bigjsUSD });

      expect(isNegative(d)).toBe(true);
    });
    it('returns false when amount is greater than 0', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });

      expect(isNegative(d)).toBe(false);
    });
    it('returns false when amount is equal to 0', () => {
      const d1 = dinero({ amount: new Big(0), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(-0), currency: bigjsUSD });

      expect(isNegative(d1)).toBe(false);
      expect(isNegative(d2)).toBe(false);
    });
  });
});
