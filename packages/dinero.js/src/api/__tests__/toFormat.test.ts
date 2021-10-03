import { MGA, USD } from '@dinero.js/currencies';
import Big from 'big.js';
import type { Dinero } from 'dinero.js';

import { toFormat } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

function toIntlFormat<TAmount>(d: Dinero<TAmount>) {
  return toFormat(d, ({ decimal, currency }) => {
    return Number(decimal).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.code,
    });
  });
}

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
      it('formats the Dinero object using the `decimal` value, with trailing zeros', () => {
        const d = dinero({ amount: 1000, currency: USD });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 10.00');
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

        expect(toIntlFormat(d)).toBe('$10.50');
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
      it('does not consider decimal a multi-base currency which compiles to a multiple of 10', () => {
        const d = dinero({
          amount: 13,
          currency: { code: 'ABC', exponent: 1, base: [5, 2] },
        });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('formats a single-base Dinero object using the `units` value', () => {
        const d = dinero({ amount: 13, currency: MGA });

        expect(
          toFormat(
            d,
            ({ units }) => `${units[0]} ariary, ${units[1]} iraimbilanja`
          )
        ).toBe('2 ariary, 3 iraimbilanja');
      });
      it('formats a multi-base Dinero object using the `units` value', () => {
        function transformer({ units }) {
          const amounts = [
            { amount: units[0], label: '🍩' },
            { amount: units[1], label: '🍪' },
            { amount: units[2], label: '🍭' },
          ];

          return amounts
            .filter(({ amount }) => amount > 0)
            .map(({ amount, label }) => `${amount} ${label}`)
            .join(' and ');
        }

        const d = dinero({
          amount: 720,
          currency: {
            code: 'POP',
            base: [30, 16],
            exponent: 1,
          },
        });

        expect(toFormat(d, transformer)).toBe('1 🍩 and 15 🍪');
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
        const d = dinero({
          amount: 1000000000000000050n,
          currency: bigintUSD,
        });

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

        expect(toIntlFormat(d)).toBe('$10.50');
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
      it('formats a single-base Dinero object using the `units` value', () => {
        const d = dinero({ amount: 13n, currency: bigintMGA });

        expect(
          toFormat(
            d,
            ({ units }) => `${units[0]} ariary, ${units[1]} iraimbilanja`
          )
        ).toBe('2 ariary, 3 iraimbilanja');
      });
      it('formats a multi-base Dinero object using the `units` value', () => {
        function transformer({ units }) {
          const amounts = [
            { amount: units[0], label: '🍩' },
            { amount: units[1], label: '🍪' },
            { amount: units[2], label: '🍭' },
          ];

          return amounts
            .filter(({ amount }) => amount > 0n)
            .map(({ amount, label }) => `${amount} ${label}`)
            .join(' and ');
        }

        const d = dinero({
          amount: 720n,
          currency: {
            code: 'POP',
            base: [30n, 16n],
            exponent: 1n,
          },
        });

        expect(toFormat(d, transformer)).toBe('1 🍩 and 15 🍪');
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
        const d = dinero({
          amount: new Big('1000000000000000050'),
          currency: bigjsUSD,
        });

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
        const d = dinero({
          amount: new Big(4545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(
          toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
        ).toBe('USD 4.545');
      });
      it('formats using the Intl API after casting `decimal` into a number', () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        expect(toIntlFormat(d)).toBe('$10.50');
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
          currency: {
            code: 'ABC',
            exponent: new Big(1),
            base: [new Big(5), new Big(2)],
          },
        });

        expect(toFormat(d, ({ decimal }) => decimal)).toBeUndefined();
      });
      it('formats a single-base Dinero object using the `units` value', () => {
        const d = dinero({ amount: new Big(13), currency: bigjsMGA });

        expect(
          toFormat(
            d,
            ({ units }) => `${units[0]} ariary, ${units[1]} iraimbilanja`
          )
        ).toBe('2 ariary, 3 iraimbilanja');
      });
      it('formats a multi-base Dinero object using the `units` value', () => {
        function transformer({ units }) {
          const amounts = [
            { amount: units[0], label: '🍩' },
            { amount: units[1], label: '🍪' },
            { amount: units[2], label: '🍭' },
          ];

          return amounts
            .filter(({ amount }) => amount > new Big(0))
            .map(({ amount, label }) => `${amount} ${label}`)
            .join(' and ');
        }

        const d = dinero({
          amount: new Big(720),
          currency: {
            code: 'POP',
            base: [new Big(30), new Big(16)],
            exponent: new Big(1),
          },
        });

        expect(toFormat(d, transformer)).toBe('1 🍩 and 15 🍪');
      });
    });
  });
});
