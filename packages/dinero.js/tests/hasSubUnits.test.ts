import { MGA, USD } from '@dinero.js/currencies';
import Big from 'big.js';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from 'test-utils';

import { hasSubUnits } from '..';

describe('hasSubUnits', () => {
  describe('number', () => {
    const dinero = createNumberDinero;
    const GBP = { code: 'GBP', base: [20, 12], exponent: 1 };

    describe('decimal currencies', () => {
      it('returns false when there are no sub-units', () => {
        const d = dinero({ amount: 1100, currency: USD });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units based on a custom scale', () => {
        const d = dinero({ amount: 1100, currency: USD, scale: 3 });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns true when there are sub-units', () => {
        const d = dinero({ amount: 1150, currency: USD });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns false when there are no sub-units based on a custom scale', () => {
        const d = dinero({ amount: 1150, currency: USD, scale: 1 });

        expect(hasSubUnits(d)).toBe(false);
      });
    });
    describe('non-decimal currencies', () => {
      it('returns false when there are no sub-units', () => {
        const d = dinero({ amount: 10, currency: MGA });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units', () => {
        const d = dinero({ amount: 11, currency: MGA });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns false when there are no sub-units based on a multi-base', () => {
        const d = dinero({ amount: 240, currency: GBP });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units based on a multi-base', () => {
        const d = dinero({ amount: 267, currency: GBP });

        expect(hasSubUnits(d)).toBe(true);
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintMGA = castToBigintCurrency(MGA);
    const bigintGBP = { code: 'GBP', base: [20n, 12n], exponent: 1n };

    describe('decimal currencies', () => {
      it('returns false when there are no sub-units', () => {
        const d = dinero({ amount: 1100n, currency: bigintUSD });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units based on a custom scale', () => {
        const d = dinero({ amount: 1100n, currency: bigintUSD, scale: 3n });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns true when there are sub-units', () => {
        const d = dinero({ amount: 1150n, currency: bigintUSD });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns false when there are no sub-units based on a custom scale', () => {
        const d = dinero({ amount: 1150n, currency: bigintUSD, scale: 1n });

        expect(hasSubUnits(d)).toBe(false);
      });
    });
    describe('non-decimal currencies', () => {
      it('returns false when there are no sub-units', () => {
        const d = dinero({ amount: 10n, currency: bigintMGA });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units', () => {
        const d = dinero({ amount: 11n, currency: bigintMGA });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns false when there are no sub-units based on a multi-base', () => {
        const d = dinero({ amount: 240n, currency: bigintGBP });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units based on a multi-base', () => {
        const d = dinero({ amount: 267n, currency: bigintGBP });

        expect(hasSubUnits(d)).toBe(true);
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsMGA = castToBigjsCurrency(MGA);
    const bigjsGBP = {
      code: 'GBP',
      base: [new Big(20), new Big(12)],
      exponent: new Big(1),
    };

    describe('decimal currencies', () => {
      it('returns false when there are no sub-units', () => {
        const d = dinero({ amount: new Big(1100), currency: bigjsUSD });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units based on a custom scale', () => {
        const d = dinero({
          amount: new Big(1100),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns true when there are sub-units', () => {
        const d = dinero({ amount: new Big(1150), currency: bigjsUSD });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns false when there are no sub-units based on a custom scale', () => {
        const d = dinero({
          amount: new Big(1150),
          currency: bigjsUSD,
          scale: new Big(1),
        });

        expect(hasSubUnits(d)).toBe(false);
      });
    });
    describe('non-decimal currencies', () => {
      it('returns false when there are no sub-units', () => {
        const d = dinero({ amount: new Big(10), currency: bigjsMGA });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units', () => {
        const d = dinero({ amount: new Big(11), currency: bigjsMGA });

        expect(hasSubUnits(d)).toBe(true);
      });
      it('returns false when there are no sub-units based on a multi-base', () => {
        const d = dinero({ amount: new Big(240), currency: bigjsGBP });

        expect(hasSubUnits(d)).toBe(false);
      });
      it('returns true when there are sub-units based on a multi-base', () => {
        const d = dinero({ amount: new Big(267), currency: bigjsGBP });

        expect(hasSubUnits(d)).toBe(true);
      });
    });
  });
});
