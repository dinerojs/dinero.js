import { EUR, USD, MGA } from '@dinero.js/currencies';
import Big from 'big.js';

import { compare } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('compare', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    describe('decimal currencies', () => {
      it('returns -1 when the first amount is less than the other', () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 800, currency: USD });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('returns 0 when amounts are equal', () => {
        const d1 = dinero({ amount: 500, currency: USD });
        const d2 = dinero({ amount: 500, currency: USD });

        expect(compare(d1, d2)).toBe(0);
      });
      it('returns 1 when the first amount is greater than the other', () => {
        const d1 = dinero({ amount: 800, currency: USD });
        const d2 = dinero({ amount: 500, currency: USD });

        expect(compare(d1, d2)).toBe(1);
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 5000, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 800, currency: USD });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 800, currency: USD });
        const d2 = dinero({ amount: 500, currency: EUR });

        expect(() => {
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('returns -1 when the first amount is less than the other', () => {
        const d1 = dinero({ amount: 5, currency: MGA });
        const d2 = dinero({ amount: 8, currency: MGA });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('returns 0 when amounts are equal', () => {
        const d1 = dinero({ amount: 5, currency: MGA });
        const d2 = dinero({ amount: 5, currency: MGA });

        expect(compare(d1, d2)).toBe(0);
      });
      it('returns 1 when the first amount is greater than the other', () => {
        const d1 = dinero({ amount: 8, currency: MGA });
        const d2 = dinero({ amount: 5, currency: MGA });

        expect(compare(d1, d2)).toBe(1);
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 25, currency: MGA, scale: 2 });
        const d2 = dinero({ amount: 8, currency: MGA });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 800, currency: USD });
        const d2 = dinero({ amount: 5, currency: MGA });

        expect(() => {
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintMGA = castToBigintCurrency(MGA);

    describe('decimal currencies', () => {
      it('returns -1 when the first amount is less than the other', () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 800n, currency: bigintUSD });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('returns 0 when amounts are equal', () => {
        const d1 = dinero({ amount: 500n, currency: bigintUSD });
        const d2 = dinero({ amount: 500n, currency: bigintUSD });

        expect(compare(d1, d2)).toBe(0);
      });
      it('returns 1 when the first amount is greater than the other', () => {
        const d1 = dinero({ amount: 800n, currency: bigintUSD });
        const d2 = dinero({ amount: 500n, currency: bigintUSD });

        expect(compare(d1, d2)).toBe(1);
      });
      it('correctly compares large integers', () => {
        const d1 = dinero({
          amount: 1000000000000000050n,
          currency: bigintUSD,
        });
        const d2 = dinero({
          amount: 1000000000000000060n,
          currency: bigintUSD,
        });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 5000n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 800n, currency: bigintUSD });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 800n, currency: bigintUSD });
        const d2 = dinero({ amount: 500n, currency: bigintEUR });

        expect(() => {
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('returns -1 when the first amount is less than the other', () => {
        const d1 = dinero({ amount: 5n, currency: bigintMGA });
        const d2 = dinero({ amount: 8n, currency: bigintMGA });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('returns 0 when amounts are equal', () => {
        const d1 = dinero({ amount: 5n, currency: bigintMGA });
        const d2 = dinero({ amount: 5n, currency: bigintMGA });

        expect(compare(d1, d2)).toBe(0);
      });
      it('returns 1 when the first amount is greater than the other', () => {
        const d1 = dinero({ amount: 8n, currency: bigintMGA });
        const d2 = dinero({ amount: 5n, currency: bigintMGA });

        expect(compare(d1, d2)).toBe(1);
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({ amount: 25n, currency: bigintMGA, scale: 2n });
        const d2 = dinero({ amount: 8n, currency: bigintMGA });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: 800n, currency: bigintUSD });
        const d2 = dinero({ amount: 5n, currency: bigintMGA });

        expect(() => {
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsMGA = castToBigjsCurrency(MGA);

    describe('decimal currencies', () => {
      it('returns -1 when the first amount is less than the other', () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('returns 0 when amounts are equal', () => {
        const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

        expect(compare(d1, d2)).toBe(0);
      });
      it('returns 1 when the first amount is greater than the other', () => {
        const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(500), currency: bigjsUSD });

        expect(compare(d1, d2)).toBe(1);
      });
      it('correctly compares large integers', () => {
        const d1 = dinero({
          amount: new Big('1000000000000000050'),
          currency: bigjsUSD,
        });
        const d2 = dinero({
          amount: new Big('1000000000000000060'),
          currency: bigjsUSD,
        });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({
          amount: new Big(5000),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({ amount: new Big(800), currency: bigjsUSD });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(500), currency: bigjsEUR });

        expect(() => {
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('returns -1 when the first amount is less than the other', () => {
        const d1 = dinero({ amount: new Big(5), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(8), currency: bigjsMGA });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('returns 0 when amounts are equal', () => {
        const d1 = dinero({ amount: new Big(5), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(5), currency: bigjsMGA });

        expect(compare(d1, d2)).toBe(0);
      });
      it('returns 1 when the first amount is greater than the other', () => {
        const d1 = dinero({ amount: new Big(8), currency: bigjsMGA });
        const d2 = dinero({ amount: new Big(5), currency: bigjsMGA });

        expect(compare(d1, d2)).toBe(1);
      });
      it('normalizes the result to the highest scale', () => {
        const d1 = dinero({
          amount: new Big(25),
          currency: bigjsMGA,
          scale: new Big(2),
        });
        const d2 = dinero({ amount: new Big(8), currency: bigjsMGA });

        expect(compare(d1, d2)).toBe(-1);
      });
      it('throws when using different currencies', () => {
        const d1 = dinero({ amount: new Big(800), currency: bigjsUSD });
        const d2 = dinero({ amount: new Big(5), currency: bigjsMGA });

        expect(() => {
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Objects must have the same currency."`
        );
      });
    });
  });
});
