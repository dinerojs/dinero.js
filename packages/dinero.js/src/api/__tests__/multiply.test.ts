import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { multiply, toSnapshot } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('multiply', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('multiplies positive Dinero objects', () => {
      const d = dinero({ amount: 400, currency: USD });

      const snapshot = toSnapshot(multiply(d, 4));

      expect(snapshot).toEqual({
        amount: 1600,
        scale: 2,
        currency: USD,
      });
    });
    it('converts the multiplied amount to the safest scale', () => {
      const d = dinero({ amount: 401, currency: USD });

      const snapshot = toSnapshot(multiply(d, { amount: 2001, scale: 3 }));

      expect(snapshot).toEqual({
        amount: 802401,
        scale: 5,
        currency: USD,
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('multiplies positive Dinero objects', () => {
      const d = dinero({ amount: 400n, currency: bigintUSD });

      const snapshot = toSnapshot(multiply(d, 4n));

      expect(snapshot).toEqual({
        amount: 1600n,
        scale: 2n,
        currency: bigintUSD,
      });
    });
    it('converts the multiplied amount to the safest scale', () => {
      const d = dinero({ amount: 401n, currency: bigintUSD });

      const snapshot = toSnapshot(multiply(d, { amount: 2001n, scale: 3n }));

      expect(snapshot).toEqual({
        amount: 802401n,
        scale: 5n,
        currency: bigintUSD,
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('multiplies positive Dinero objects', () => {
      const d = dinero({ amount: new Big(400), currency: bigjsUSD });

      const snapshot = toSnapshot(multiply(d, new Big(4)));

      expect(snapshot).toEqual({
        amount: new Big(1600),
        scale: new Big(2),
        currency: bigjsUSD,
      });
    });
    it('converts the multiplied amount to the safest scale', () => {
      const d = dinero({ amount: new Big(401), currency: bigjsUSD });

      const snapshot = toSnapshot(
        multiply(d, { amount: new Big(2001), scale: new Big(3) })
      );

      expect(snapshot).toEqual({
        amount: new Big(802401),
        scale: new Big(5),
        currency: bigjsUSD,
      });
    });
  });
});
