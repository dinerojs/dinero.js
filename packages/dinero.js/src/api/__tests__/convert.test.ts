import { EUR, IQD, USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { convert, toSnapshot } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('convert', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('converts a Dinero object to another currency', () => {
      const d = dinero({ amount: 500, currency: USD });

      const converted = convert(d, EUR, {
        EUR: {
          amount: 89,
          scale: 2,
        },
      });

      expect(toSnapshot(converted)).toEqual({
        amount: 44500,
        currency: EUR,
        scale: 4,
      });
    });
    it("uses the destination currency's exponent as scale", () => {
      const d = dinero({ amount: 500, currency: USD });

      const converted = convert(d, IQD, {
        IQD: 1199,
      });

      expect(toSnapshot(converted)).toEqual({
        amount: 5995000,
        currency: IQD,
        scale: 3,
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintIQD = castToBigintCurrency(IQD);

    it('converts a Dinero object to another currency', () => {
      const d = dinero({ amount: 500n, currency: bigintUSD });

      const converted = convert(d, bigintEUR, {
        EUR: {
          amount: 89n,
          scale: 2n,
        },
      });

      expect(toSnapshot(converted)).toEqual({
        amount: 44500n,
        currency: bigintEUR,
        scale: 4n,
      });
    });
    it("uses the destination currency's exponent as scale", () => {
      const d = dinero({ amount: 500n, currency: bigintUSD });

      const converted = convert(d, bigintIQD, {
        IQD: 1199n,
      });

      expect(toSnapshot(converted)).toEqual({
        amount: 5995000n,
        currency: bigintIQD,
        scale: 3n,
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsIQD = castToBigjsCurrency(IQD);

    it('converts a Dinero object to another currency', () => {
      const d = dinero({ amount: new Big(500), currency: bigjsUSD });

      const converted = convert(d, bigjsEUR, {
        EUR: {
          amount: new Big(89),
          scale: new Big(2),
        },
      });

      expect(toSnapshot(converted)).toEqual({
        amount: new Big(44500),
        currency: bigjsEUR,
        scale: new Big(4),
      });
    });
    it("uses the destination currency's exponent as scale", () => {
      const d = dinero({ amount: new Big(500), currency: bigjsUSD });

      const converted = convert(d, bigjsIQD, {
        IQD: new Big(1199),
      });

      expect(toSnapshot(converted)).toEqual({
        amount: new Big(5995000),
        currency: bigjsIQD,
        scale: new Big(3),
      });
    });
  });
});
