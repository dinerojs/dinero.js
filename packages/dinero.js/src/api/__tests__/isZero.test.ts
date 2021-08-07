import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { isZero } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('isZero', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns true when amount is equal to 0', () => {
      const d = dinero({ amount: 0, currency: USD });

      expect(isZero(d)).toBe(true);
    });
    it('returns false when amount is not equal to 0', () => {
      const d = dinero({ amount: 100, currency: USD });

      expect(isZero(d)).toBe(false);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns true when amount is equal to 0', () => {
      const d = dinero({ amount: 0n, currency: bigintUSD });

      expect(isZero(d)).toBe(true);
    });
    it('returns false when amount is not equal to 0', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });

      expect(isZero(d)).toBe(false);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns true when amount is equal to 0', () => {
      const d = dinero({ amount: new Big(0), currency: bigjsUSD });

      expect(isZero(d)).toBe(true);
    });
    it('returns false when amount is not equal to 0', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });

      expect(isZero(d)).toBe(false);
    });
  });
});
