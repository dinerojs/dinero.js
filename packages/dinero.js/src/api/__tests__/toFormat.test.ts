import { calculator } from '@dinero.js/calculator-bigint';
import { MGA, USD } from '@dinero.js/currencies';

import { toFormat, dinero, createDinero } from '../../..';

describe('toFormat', () => {
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
  describe('bigint', () => {
    const dineroBigint = createDinero({ calculator });
    const BigUSD = { code: 'USD', base: 10n, exponent: 2n };

    it('formats the Dinero object using the `decimal` value', () => {
      const d = dineroBigint({
        amount: 1000000000000000050n,
        currency: BigUSD,
      });

      expect(
        toFormat(d, ({ decimal, currency }) => `${currency.code} ${decimal}`)
      ).toBe('USD 10000000000000000.50');
    });
  });
});
