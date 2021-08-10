import { EUR, IQD, USD, MGA, MRU } from '@dinero.js/currencies';
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

    describe('decimal currencies', () => {
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
    describe('non-decimal currencies', () => {
      it('converts a Dinero object to another currency', () => {
        const d = dinero({ amount: 1, currency: MRU });

        const converted = convert(d, MGA, {
          MGA: 108,
        });

        expect(toSnapshot(converted)).toEqual({
          amount: 108,
          currency: MGA,
          scale: 1,
        });
      });
      it('converts to the safest scale', () => {
        const d = dinero({ amount: 100, currency: USD });

        const converted = convert(d, MGA, {
          MGA: {
            amount: 3912566,
            scale: 3,
          },
        });

        expect(toSnapshot(converted)).toEqual({
          amount: 391256600,
          currency: MGA,
          scale: 5,
        });
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintIQD = castToBigintCurrency(IQD);
    const bigintMGA = castToBigintCurrency(MGA);
    const bigintMRU = castToBigintCurrency(MRU);

    describe('decimal currencies', () => {
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
    describe('non-decimal currencies', () => {
      it('converts a Dinero object to another currency', () => {
        const d = dinero({ amount: 1n, currency: bigintMRU });

        const converted = convert(d, bigintMGA, {
          MGA: 108n,
        });

        expect(toSnapshot(converted)).toEqual({
          amount: 108n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it('converts to the safest scale', () => {
        const d = dinero({ amount: 100n, currency: bigintUSD });

        const converted = convert(d, bigintMGA, {
          MGA: {
            amount: 3912566n,
            scale: 3n,
          },
        });

        expect(toSnapshot(converted)).toEqual({
          amount: 391256600n,
          currency: bigintMGA,
          scale: 5n,
        });
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsIQD = castToBigjsCurrency(IQD);
    const bigjsMGA = castToBigjsCurrency(MGA);
    const bigjsMRU = castToBigjsCurrency(MRU);

    describe('decimal currencies', () => {
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
    describe('non-decimal currencies', () => {
      it('converts a Dinero object to another currency', () => {
        const d = dinero({ amount: new Big(1), currency: bigjsMRU });

        const converted = convert(d, bigjsMGA, {
          MGA: new Big(108),
        });

        expect(toSnapshot(converted)).toEqual({
          amount: new Big(108),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it('converts to the safest scale', () => {
        const d = dinero({ amount: new Big(100), currency: bigjsUSD });

        const converted = convert(d, bigjsMGA, {
          MGA: {
            amount: new Big(3912566),
            scale: new Big(3),
          },
        });

        expect(toSnapshot(converted)).toEqual({
          amount: new Big(391256600),
          currency: bigjsMGA,
          scale: new Big(5),
        });
      });
    });
  });
});
