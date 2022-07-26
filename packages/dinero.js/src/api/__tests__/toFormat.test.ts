import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { toFormat } from '..';
import type { Transformer } from '../../..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('toFormat', () => {
  const simpleFormatter = ({ amount, currency }) =>
    `${currency.code} ${amount}`;

  describe('number', () => {
    const dinero = createNumberDinero;

    describe('with simple formatter', () => {
      it('formats the Dinero object with the passed transformer', () => {
        const d = dinero({ amount: 500, currency: USD });

        expect(toFormat(d, simpleFormatter)).toBe('USD 5');
      });
      it('formats the Dinero object with the passed transformer using the scale', () => {
        const d = dinero({ amount: 4545, currency: USD, scale: 3 });

        expect(toFormat(d, simpleFormatter)).toBe('USD 4.545');
      });
    });
    describe('with complex formatter', () => {
      const complexFormatter: Transformer<
        number,
        readonly Intl.NumberFormatPart[]
      > = ({ amount, currency }) => {
        const numberFormat = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.code,
        });
        return numberFormat.formatToParts(amount);
      };

      it('formats the Dinero object with the passed transformer', () => {
        const d = dinero({ amount: 500, currency: USD });

        expect(toFormat(d, complexFormatter)).toEqual([
          { type: 'currency', value: '$' },
          { type: 'integer', value: '5' },
          { type: 'decimal', value: '.' },
          { type: 'fraction', value: '00' },
        ]);
      });
      it('formats the Dinero object with the passed transformer using the scale', () => {
        const d = dinero({ amount: 4545, currency: USD, scale: 3 });

        expect(toFormat(d, complexFormatter)).toEqual([
          { type: 'currency', value: '$' },
          { type: 'integer', value: '4' },
          { type: 'decimal', value: '.' },
          { type: 'fraction', value: '55' },
        ]);
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    describe('with simple formatter', () => {
      it('formats the Dinero object with the passed transformer', () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        expect(toFormat(d, simpleFormatter)).toBe('USD 5');
      });
      it('formats the Dinero object with the passed transformer using the scale', () => {
        const d = dinero({ amount: 4545n, currency: bigintUSD, scale: 3n });

        expect(toFormat(d, simpleFormatter)).toBe('USD 4.545');
      });
    });
    describe('with complex formatter', () => {
      const complexFormatter: Transformer<
        bigint,
        readonly Intl.NumberFormatPart[]
      > = ({ amount, currency }) => {
        const numberFormat = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.code,
        });
        return numberFormat.formatToParts(Number(amount));
      };

      it('formats the Dinero object with the passed transformer', () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        expect(toFormat(d, complexFormatter)).toEqual([
          { type: 'currency', value: '$' },
          { type: 'integer', value: '5' },
          { type: 'decimal', value: '.' },
          { type: 'fraction', value: '00' },
        ]);
      });
      it('formats the Dinero object with the passed transformer using the scale', () => {
        const d = dinero({ amount: 4545n, currency: bigintUSD, scale: 3n });

        expect(toFormat(d, complexFormatter)).toEqual([
          { type: 'currency', value: '$' },
          { type: 'integer', value: '4' },
          { type: 'decimal', value: '.' },
          { type: 'fraction', value: '55' },
        ]);
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    describe('with simple formatter', () => {
      it('formats the Dinero object with the passed transformer', () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        expect(toFormat(d, simpleFormatter)).toBe('USD 5');
      });
      it('formats the Dinero object with the passed transformer using the scale', () => {
        const d = dinero({
          amount: new Big(4545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(toFormat(d, simpleFormatter)).toBe('USD 4.545');
      });
    });
    describe('with complex formatter', () => {
      const complexFormatter: Transformer<
        Big,
        readonly Intl.NumberFormatPart[]
      > = ({ amount, currency }) => {
        const numberFormat = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency.code,
        });
        return numberFormat.formatToParts(Number(amount.toFixed(3)));
      };

      it('formats the Dinero object with the passed transformer', () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        expect(toFormat(d, complexFormatter)).toEqual([
          { type: 'currency', value: '$' },
          { type: 'integer', value: '5' },
          { type: 'decimal', value: '.' },
          { type: 'fraction', value: '00' },
        ]);
      });
      it('formats the Dinero object with the passed transformer using the scale', () => {
        const d = dinero({
          amount: new Big(4545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(toFormat(d, complexFormatter)).toEqual([
          { type: 'currency', value: '$' },
          { type: 'integer', value: '4' },
          { type: 'decimal', value: '.' },
          { type: 'fraction', value: '55' },
        ]);
      });
    });
  });
});
