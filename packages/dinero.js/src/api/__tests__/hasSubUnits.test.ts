import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { hasSubUnits } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('hasSubUnits', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns false when there are no sub-units', () => {
      const d = dinero({ amount: 1100, currency: USD });

      expect(hasSubUnits(d)).toBe(false);
    });
    it('returns true when there are sub-units based on a custom scale', () => {
      const d = dinero({ amount: 1100, currency: USD, scale: 3 });

      expect(hasSubUnits(d)).toBe(true);
    });
    it('returns true when there are sub-units', () => {
      const d = dinero({ amount: 1150, currency: USD });

      expect(hasSubUnits(d)).toBe(true);
    });
    it('returns false when there are no sub-units based on a custom scale', () => {
      const d = dinero({ amount: 1150, currency: USD, scale: 1 });

      expect(hasSubUnits(d)).toBe(false);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns false when there are no sub-units', () => {
      const d = dinero({ amount: 1100n, currency: bigintUSD });

      expect(hasSubUnits(d)).toBe(false);
    });
    it('returns true when there are sub-units based on a custom scale', () => {
      const d = dinero({ amount: 1100n, currency: bigintUSD, scale: 3n });

      expect(hasSubUnits(d)).toBe(true);
    });
    it('returns true when there are sub-units', () => {
      const d = dinero({ amount: 1150n, currency: bigintUSD });

      expect(hasSubUnits(d)).toBe(true);
    });
    it('returns false when there are no sub-units based on a custom scale', () => {
      const d = dinero({ amount: 1150n, currency: bigintUSD, scale: 1n });

      expect(hasSubUnits(d)).toBe(false);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns false when there are no sub-units', () => {
      const d = dinero({ amount: new Big(1100), currency: bigjsUSD });

      expect(hasSubUnits(d)).toBe(false);
    });
    it('returns true when there are sub-units based on a custom scale', () => {
      const d = dinero({
        amount: new Big(1100),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(hasSubUnits(d)).toBe(true);
    });
    it('returns true when there are sub-units', () => {
      const d = dinero({ amount: new Big(1150), currency: bigjsUSD });

      expect(hasSubUnits(d)).toBe(true);
    });
    it('returns false when there are no sub-units based on a custom scale', () => {
      const d = dinero({
        amount: new Big(1150),
        currency: bigjsUSD,
        scale: new Big(1),
      });

      expect(hasSubUnits(d)).toBe(false);
    });
  });
});
