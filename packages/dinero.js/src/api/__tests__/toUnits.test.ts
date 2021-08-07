import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { toUnits } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('toUnits', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    describe('decimal currencies', () => {
      it('returns the amount in currency units', () => {
        const d = dinero({ amount: 1050, currency: USD });

        expect(toUnits(d)).toEqual([10, 50]);
      });
      it('returns the amount in currency units, based on a custom scale', () => {
        const d = dinero({ amount: 10545, currency: USD, scale: 3 });

        expect(toUnits(d)).toEqual([10, 545]);
      });
      it('returns the amount in currency units, with a single trailing zero', () => {
        const d = dinero({ amount: 1000, currency: USD });

        expect(toUnits(d)).toEqual([10, 0]);
      });
    });
    describe('non-decimal currencies', () => {
      it('returns the amount in currency units', () => {
        const GRD = { code: 'GRD', base: 6, exponent: 1 };
        const d = dinero({ amount: 9, currency: GRD });

        expect(toUnits(d)).toEqual([1, 3]);
      });
      it('handles currencies with multiple subdivisions', () => {
        const GBP = { code: 'GBP', base: [20, 12], exponent: 1 };
        const d = dinero({ amount: 267, currency: GBP });

        expect(toUnits(d)).toEqual([1, 2, 3]);
      });
      it('handles intermediary zero values', () => {
        const GBP = { code: 'GBP', base: [20, 12], exponent: 1 };
        const d = dinero({ amount: 2, currency: GBP });

        expect(toUnits(d)).toEqual([0, 0, 2]);
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    describe('decimal currencies', () => {
      it('returns the amount in currency units', () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        expect(toUnits(d)).toEqual([10n, 50n]);
      });
      it('returns the amount in currency units, based on a custom scale', () => {
        const d = dinero({ amount: 10545n, currency: bigintUSD, scale: 3n });

        expect(toUnits(d)).toEqual([10n, 545n]);
      });
      it('returns the amount in currency units, with a single trailing zero', () => {
        const d = dinero({ amount: 1000n, currency: bigintUSD });

        expect(toUnits(d)).toEqual([10n, 0n]);
      });
    });
    describe('non-decimal currencies', () => {
      it('returns the amount in currency units', () => {
        const GRD = { code: 'GRD', base: 6n, exponent: 1n };
        const d = dinero({ amount: 9n, currency: GRD });

        expect(toUnits(d)).toEqual([1n, 3n]);
      });
      it('handles currencies with multiple subdivisions', () => {
        const GBP = { code: 'GBP', base: [20n, 12n], exponent: 1n };
        const d = dinero({ amount: 267n, currency: GBP });

        expect(toUnits(d)).toEqual([1n, 2n, 3n]);
      });
      it('handles intermediary zero values', () => {
        const GBP = { code: 'GBP', base: [20n, 12n], exponent: 1n };
        const d = dinero({ amount: 2n, currency: GBP });

        expect(toUnits(d)).toEqual([0n, 0n, 2n]);
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    describe('decimal currencies', () => {
      it('returns the amount in currency units', () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        expect(toUnits(d)).toEqual([new Big(10), new Big(50)]);
      });
      it('returns the amount in currency units, based on a custom scale', () => {
        const d = dinero({
          amount: new Big(10545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(toUnits(d)).toEqual([new Big(10), new Big(545)]);
      });
      it('returns the amount in currency units, with a single trailing zero', () => {
        const d = dinero({ amount: new Big(1000), currency: bigjsUSD });

        expect(toUnits(d)).toEqual([new Big(10), new Big(0)]);
      });
    });
    describe('non-decimal currencies', () => {
      it('returns the amount in currency units', () => {
        const GRD = { code: 'GRD', base: new Big(6), exponent: new Big(1) };
        const d = dinero({ amount: new Big(9), currency: GRD });

        expect(toUnits(d)).toEqual([new Big(1), new Big(3)]);
      });
      it('handles currencies with multiple subdivisions', () => {
        const GBP = {
          code: 'GBP',
          base: [new Big(20), new Big(12)],
          exponent: new Big(1),
        };
        const d = dinero({ amount: new Big(267), currency: GBP });

        expect(toUnits(d)).toEqual([new Big(1), new Big(2), new Big(3)]);
      });
      it('handles intermediary zero values', () => {
        const GBP = {
          code: 'GBP',
          base: [new Big(20), new Big(12)],
          exponent: new Big(1),
        };
        const d = dinero({ amount: new Big(2), currency: GBP });

        expect(toUnits(d)).toEqual([new Big(0), new Big(0), new Big(2)]);
      });
    });
  });
});
