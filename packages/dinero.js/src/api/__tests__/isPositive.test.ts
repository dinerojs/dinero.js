import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { isPositive } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('isPositive', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns false when amount is less than 0', () => {
      const d = dinero({ amount: -100, currency: USD });

      expect(isPositive(d)).toBe(false);
    });
    it('returns true when amount is greater than 0', () => {
      const d = dinero({ amount: 100, currency: USD });

      expect(isPositive(d)).toBe(true);
    });
    it('returns true when amount is equal to 0', () => {
      const d = dinero({ amount: 0, currency: USD });

      expect(isPositive(d)).toBe(true);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns false when amount is less than 0', () => {
      const d = dinero({ amount: -100n, currency: bigintUSD });

      expect(isPositive(d)).toBe(false);
    });
    it('returns true when amount is greater than 0', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });

      expect(isPositive(d)).toBe(true);
    });
    it('returns true when amount is equal to 0', () => {
      const d = dinero({ amount: 0n, currency: bigintUSD });

      expect(isPositive(d)).toBe(true);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns false when amount is less than 0', () => {
      const d = dinero({ amount: new Big(-100), currency: bigjsUSD });

      expect(isPositive(d)).toBe(false);
    });
    it('returns true when amount is greater than 0', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });

      expect(isPositive(d)).toBe(true);
    });
    it('returns true when amount is equal to 0', () => {
      const d = dinero({ amount: new Big(0), currency: bigjsUSD });

      expect(isPositive(d)).toBe(true);
    });
  });
});
