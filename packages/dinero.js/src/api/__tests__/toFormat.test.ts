import { MGA, USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { toFormat } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('toFormat', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    describe('decimal currencies', () => {
      it('formats the Dinero object using the `decimal` value', () => {
        const d = dinero({ amount: 1050, currency: USD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 10.50');
      });
      it('formats the Dinero object and pads the decimal part', () => {
        const d = dinero({ amount: 500, currency: USD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 5.00');
      });
      it('formats the Dinero object using the scale', () => {
        const d = dinero({ amount: 4545, currency: USD, scale: 3 });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 4.545');
      });
      it('formats using the Intl API after casting `decimal` into a number', () => {
        const d = dinero({ amount: 1050, currency: USD });

        expect(
          toFormat(d, ({ decimal, currency }) => {
            return Number(decimal).toLocaleString('en-US', {
              style: 'currency',
              currency: currency.code,
            });
          })
        ).toBe('$10.50');
      });
      it('formats the Dinero object using the `units` value', () => {
        const d = dinero({ amount: 500, currency: USD });

        expect(
          toFormat(d, ({ units }) => `${units[0]} dollars, ${units[1]} cents`)
        ).toBe('5 dollars, 0 cents');
      });
    });
    describe('non-decimal currencies', () => {
      it('does not have access to a `decimal` value', () => {
        const d = dinero({ amount: 13, currency: MGA });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('does not consider decimal a currency which compiles to a multiple of 10', () => {
        const d = dinero({
          amount: 13,
          currency: { code: 'ABC', exponent: 1, base: [5, 2] },
        });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('formats the Dinero object using the `units` value', () => {
        const d = dinero({ amount: 13, currency: MGA });

        expect(
          toFormat(
            d,
            ({ units }) => `${units[0]} ariary, ${units[1]} iraimbilanja`
          )
        ).toBe('2 ariary, 3 iraimbilanja');
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintMGA = castToBigintCurrency(MGA);

    describe('decimal currencies', () => {
      it('formats the Dinero object using the `decimal` value', () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 10.50');
      });
      it('formats the Dinero object using the `decimal` value with large integers', () => {
        const d = dinero({ amount: 1000000000000000050n, currency: bigintUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 10000000000000000.50');
      });
      it('formats the Dinero object and pads the decimal part', () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 5.00');
      });
      it('formats the Dinero object using the scale', () => {
        const d = dinero({ amount: 4545n, currency: bigintUSD, scale: 3n });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 4.545');
      });
      it('formats using the Intl API after casting `decimal` into a number', () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => {
            return Number(decimal).toLocaleString('en-US', {
              style: 'currency',
              currency: currency.code,
            });
          })
        ).toBe('$10.50');
      });
      it('formats the Dinero object using the `units` value', () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        expect(
          toFormat(d, ({ units }) => `${units[0]} dollars, ${units[1]} cents`)
        ).toBe('5 dollars, 0 cents');
      });
    });
    describe('non-decimal currencies', () => {
      it('does not have access to a `decimal` value', () => {
        const d = dinero({ amount: 13n, currency: bigintMGA });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('does not consider decimal a currency which compiles to a multiple of 10', () => {
        const d = dinero({
          amount: 13n,
          currency: { code: 'ABC', exponent: 1n, base: [5n, 2n] },
        });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('formats the Dinero object using the `units` value', () => {
        const d = dinero({ amount: 13n, currency: bigintMGA });

        expect(
          toFormat(
            d,
            ({ units }) => `${units[0]} ariary, ${units[1]} iraimbilanja`
          )
        ).toBe('2 ariary, 3 iraimbilanja');
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsMGA = castToBigjsCurrency(MGA);

    describe('decimal currencies', () => {
      it('formats the Dinero object using the `decimal` value', () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 10.50');
      });
      it('formats the Dinero object using the `decimal` value with large integers', () => {
        const d = dinero({ amount: new Big('1000000000000000050'), currency: bigjsUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 10000000000000000.50');
      });
      it('formats the Dinero object and pads the decimal part', () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 5.00');
      });
      it('formats the Dinero object using the scale', () => {
        const d = dinero({ amount: new Big(4545), currency: bigjsUSD, scale: new Big(3) });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 4.545');
      });
      it('formats using the Intl API after casting `decimal` into a number', () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        expect(
          toFormat(d, ({ decimal, currency }) => {
            return Number(decimal).toLocaleString('en-US', {
              style: 'currency',
              currency: currency.code,
            });
          })
        ).toBe('$10.50');
      });
      it('formats the Dinero object using the `units` value', () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        expect(
          toFormat(d, ({ units }) => `${units[0]} dollars, ${units[1]} cents`)
        ).toBe('5 dollars, 0 cents');
      });
    });
    describe('non-decimal currencies', () => {
      it('does not have access to a `decimal` value', () => {
        const d = dinero({ amount: new Big(13), currency: bigjsMGA });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('does not consider decimal a currency which compiles to a multiple of 10', () => {
        const d = dinero({
          amount: new Big(13),
          currency: { code: 'ABC', exponent: new Big(1), base: [new Big(5), new Big(2)] },
        });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('formats the Dinero object using the `units` value', () => {
        const d = dinero({ amount: new Big(13), currency: bigjsMGA });

        expect(
          toFormat(
            d,
            ({ units }) => `${units[0]} ariary, ${units[1]} iraimbilanja`
          )
        ).toBe('2 ariary, 3 iraimbilanja');
      });
    });
  });
});
