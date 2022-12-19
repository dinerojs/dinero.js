import { MGA, USD } from '@dinero.js/currencies';
import Big from 'big.js';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from 'test-utils';

import { toDecimal } from '..';

describe('toDecimal', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    describe('decimal currencies', () => {
      it('returns the amount in decimal format', () => {
        const d = dinero({ amount: 1050, currency: USD });

        expect(toDecimal(d)).toEqual('10.50');
      });
      it('returns the amount in decimal format based on a custom scale', () => {
        const d = dinero({ amount: 10545, currency: USD, scale: 3 });

        expect(toDecimal(d)).toEqual('10.545');
      });
      it('returns the amount in decimal format with trailing zeros', () => {
        const d = dinero({ amount: 1000, currency: USD });

        expect(toDecimal(d)).toBe('10.00');
      });
      it('returns the amount in decimal format with leading zeros', () => {
        const d = dinero({ amount: 1005, currency: USD });

        expect(toDecimal(d)).toBe('10.05');
      });
      it('returns the amount in decimal format and pads the decimal part', () => {
        const d = dinero({ amount: 500, currency: USD });

        expect(toDecimal(d)).toBe('5.00');
      });
      it('returns the negative amount in decimal format', () => {
        const d = dinero({ amount: -1050, currency: USD });

        expect(toDecimal(d)).toEqual('-10.50');
      });
      it('returns the negative amount with a leading zero in decimal format', () => {
        const d = dinero({ amount: -1, currency: USD });

        expect(toDecimal(d)).toEqual('-0.01');
      });
      it('returns negative zero amount as a positive value in decimal format', () => {
        const d = dinero({ amount: -0, currency: USD });

        expect(toDecimal(d)).toEqual('0.00');
      });
      it('uses a custom transformer', () => {
        const d = dinero({ amount: 1050, currency: USD });

        expect(
          toDecimal(d, ({ value, currency }) => `${currency.code} ${value}`)
        ).toBe('USD 10.50');
      });
    });
    describe('non-decimal currencies', () => {
      it('throws when passing a Dinero object using a non-decimal currency', () => {
        const d = dinero({ amount: 13, currency: MGA });

        expect(() => {
          toDecimal(d);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Currency is not decimal."`
        );
      });
      it('throws when passing a Dinero object using a multi-base currency which compiles to a multiple of 10', () => {
        const d = dinero({
          amount: 13,
          currency: { code: 'ABC', exponent: 1, base: [5, 2] },
        });

        expect(() => {
          toDecimal(d);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Currency is not decimal."`
        );
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintMGA = castToBigintCurrency(MGA);

    describe('decimal currencies', () => {
      it('returns the amount in decimal format', () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        expect(toDecimal(d)).toEqual('10.50');
      });
      it('returns the amount in decimal format with large integers', () => {
        const d = dinero({ amount: 1000000000000000050n, currency: bigintUSD });

        expect(toDecimal(d)).toEqual('10000000000000000.50');
      });
      it('returns the amount in decimal format based on a custom scale', () => {
        const d = dinero({ amount: 10545n, currency: bigintUSD, scale: 3n });

        expect(toDecimal(d)).toEqual('10.545');
      });
      it('returns the amount in decimal format with trailing zeros', () => {
        const d = dinero({ amount: 1000n, currency: bigintUSD });

        expect(toDecimal(d)).toBe('10.00');
      });
      it('returns the amount in decimal format with leading zeros', () => {
        const d = dinero({ amount: 1005n, currency: bigintUSD });

        expect(toDecimal(d)).toBe('10.05');
      });
      it('returns the amount in decimal format and pads the decimal part', () => {
        const d = dinero({ amount: 500n, currency: bigintUSD });

        expect(toDecimal(d)).toBe('5.00');
      });
      it('returns the negative amount in decimal format', () => {
        const d = dinero({ amount: -1050n, currency: bigintUSD });

        expect(toDecimal(d)).toEqual('-10.50');
      });
      it('returns the negative amount with a leading zero in decimal format', () => {
        const d = dinero({ amount: -1n, currency: bigintUSD });

        expect(toDecimal(d)).toEqual('-0.01');
      });
      it('returns negative zero amount as a positive value in decimal format', () => {
        const d = dinero({ amount: -0n, currency: bigintUSD });

        expect(toDecimal(d)).toEqual('0.00');
      });
      it('uses a custom transformer', () => {
        const d = dinero({ amount: 1050n, currency: bigintUSD });

        expect(
          toDecimal(d, ({ value, currency }) => `${currency.code} ${value}`)
        ).toBe('USD 10.50');
      });
    });
    describe('non-decimal currencies', () => {
      it('throws when passing a Dinero object using a non-decimal currency', () => {
        const d = dinero({ amount: 13n, currency: bigintMGA });

        expect(() => {
          toDecimal(d);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Currency is not decimal."`
        );
      });
      it('throws when passing a Dinero object using a multi-base currency which compiles to a multiple of 10', () => {
        const d = dinero({
          amount: 13n,
          currency: { code: 'ABC', exponent: 1n, base: [5n, 2n] },
        });

        expect(() => {
          toDecimal(d);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Currency is not decimal."`
        );
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsMGA = castToBigjsCurrency(MGA);

    describe('decimal currencies', () => {
      it('returns the amount in decimal format', () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        expect(toDecimal(d)).toEqual('10.50');
      });
      it('returns the amount in decimal format with large integers', () => {
        const d = dinero({
          amount: new Big('1000000000000000050'),
          currency: bigjsUSD,
        });

        expect(toDecimal(d)).toEqual('10000000000000000.50');
      });
      it('returns the amount in decimal format based on a custom scale', () => {
        const d = dinero({
          amount: new Big(10545),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(toDecimal(d)).toEqual('10.545');
      });
      it('returns the amount in decimal format with trailing zeros', () => {
        const d = dinero({ amount: new Big(1000), currency: bigjsUSD });

        expect(toDecimal(d)).toBe('10.00');
      });
      it('returns the amount in decimal format with leading zeros', () => {
        const d = dinero({ amount: new Big(1005), currency: bigjsUSD });

        expect(toDecimal(d)).toBe('10.05');
      });
      it('returns the amount in decimal format and pads the decimal part', () => {
        const d = dinero({ amount: new Big(500), currency: bigjsUSD });

        expect(toDecimal(d)).toBe('5.00');
      });
      it('returns the negative amount in decimal format', () => {
        const d = dinero({ amount: new Big(-1005), currency: bigjsUSD });

        expect(toDecimal(d)).toEqual('-10.05');
      });
      it('returns the negative amount with a leading zero in decimal format', () => {
        const d = dinero({ amount: new Big(-1), currency: bigjsUSD });

        expect(toDecimal(d)).toEqual('-0.01');
      });
      it('returns negative zero amount as a positive value in decimal format', () => {
        const d = dinero({ amount: new Big(-0), currency: bigjsUSD });

        expect(toDecimal(d)).toEqual('0.00');
      });
      it('uses a custom transformer', () => {
        const d = dinero({ amount: new Big(1050), currency: bigjsUSD });

        expect(
          toDecimal(d, ({ value, currency }) => `${currency.code} ${value}`)
        ).toBe('USD 10.50');
      });
    });
    describe('non-decimal currencies', () => {
      it('throws when passing a Dinero object using a non-decimal currency', () => {
        const d = dinero({ amount: new Big(13), currency: bigjsMGA });

        expect(() => {
          toDecimal(d);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Currency is not decimal."`
        );
      });
      it('throws when passing a Dinero object using a multi-base currency which compiles to a multiple of 10', () => {
        const d = dinero({
          amount: new Big(13),
          currency: {
            code: 'ABC',
            exponent: new Big(1),
            base: [new Big(5), new Big(2)],
          },
        });

        expect(() => {
          toDecimal(d);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Currency is not decimal."`
        );
      });
    });
  });
});
