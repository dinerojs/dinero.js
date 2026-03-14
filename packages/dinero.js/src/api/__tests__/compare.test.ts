import { EUR, USD, MGA } from '../../currencies';
import Big from 'big.js';
import * as fc from 'fast-check';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from 'test-utils';

import { compare, equal, lessThanOrEqual, greaterThanOrEqual } from '..';

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
          // @ts-expect-error different currencies
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `[Error: [Dinero.js] Objects must have the same currency.]`
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
          // @ts-expect-error different currencies
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `[Error: [Dinero.js] Objects must have the same currency.]`
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
          // @ts-expect-error different currencies
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `[Error: [Dinero.js] Objects must have the same currency.]`
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
          // @ts-expect-error different currencies
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `[Error: [Dinero.js] Objects must have the same currency.]`
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
          // @ts-expect-error different currencies
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `[Error: [Dinero.js] Objects must have the same currency.]`
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
          // @ts-expect-error different currencies
          compare(d1, d2);
        }).toThrowErrorMatchingInlineSnapshot(
          `[Error: [Dinero.js] Objects must have the same currency.]`
        );
      });
    });
  });
  describe('properties', () => {
    const dinero = createNumberDinero;
    const safeAmount = fc.integer({ min: -100000, max: 100000 });

    it('is antisymmetric: compare(a, b) equals -compare(b, a)', () => {
      fc.assert(
        fc.property(safeAmount, safeAmount, (a, b) => {
          const d1 = dinero({ amount: a, currency: USD });
          const d2 = dinero({ amount: b, currency: USD });

          expect(compare(d1, d2)).toBe(-compare(d2, d1));
        })
      );
    });
    it('is transitive: if a <= b and b <= c, then a <= c', () => {
      fc.assert(
        fc.property(safeAmount, safeAmount, safeAmount, (a, b, c) => {
          const sorted = [a, b, c].sort((x, y) => x - y);
          const d1 = dinero({ amount: sorted[0], currency: USD });
          const d2 = dinero({ amount: sorted[1], currency: USD });
          const d3 = dinero({ amount: sorted[2], currency: USD });

          expect(lessThanOrEqual(d1, d2)).toBe(true);
          expect(lessThanOrEqual(d2, d3)).toBe(true);
          expect(lessThanOrEqual(d1, d3)).toBe(true);
        })
      );
    });
    it('is consistent with equal: compare(a, b) === 0 iff equal(a, b)', () => {
      fc.assert(
        fc.property(safeAmount, safeAmount, (a, b) => {
          const d1 = dinero({ amount: a, currency: USD });
          const d2 = dinero({ amount: b, currency: USD });

          expect(compare(d1, d2) === 0).toBe(equal(d1, d2));
        })
      );
    });
    it('is total: for any a, b either a <= b or b <= a', () => {
      fc.assert(
        fc.property(safeAmount, safeAmount, (a, b) => {
          const d1 = dinero({ amount: a, currency: USD });
          const d2 = dinero({ amount: b, currency: USD });

          expect(lessThanOrEqual(d1, d2) || greaterThanOrEqual(d1, d2)).toBe(
            true
          );
        })
      );
    });
  });
});
