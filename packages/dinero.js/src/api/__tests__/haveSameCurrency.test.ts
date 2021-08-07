import { EUR, USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { haveSameCurrency } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('haveSameCurrency', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns true when currencies are equal', () => {
      const d1 = dinero({ amount: 2000, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns false when currencies are not equal', () => {
      const d1 = dinero({ amount: 1000, currency: USD });
      const d2 = dinero({ amount: 1000, currency: EUR });

      expect(haveSameCurrency([d1, d2])).toBe(false);
    });
    it('returns true when currencies are structurally equal', () => {
      const d1 = dinero({
        amount: 2000,
        currency: {
          code: 'USD',
          base: 10,
          exponent: 2,
        },
      });
      const d2 = dinero({
        amount: 1000,
        currency: {
          code: 'USD',
          base: 10,
          exponent: 2,
        },
      });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns true when multi-base currencies are structurally equal', () => {
      const GBP = { code: 'GBP', base: [20, 12], exponent: 1 };
      const d1 = dinero({ amount: 240, currency: GBP });
      const d2 = dinero({ amount: 240, currency: GBP });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns true when multi-base currencies compute to the same base', () => {
      const d1 = dinero({
        amount: 240,
        currency: { code: 'GBP', base: [20, 12], exponent: 1 },
      });
      const d2 = dinero({
        amount: 240,
        currency: { code: 'GBP', base: 240, exponent: 1 },
      });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it('returns true when currencies are equal', () => {
      const d1 = dinero({ amount: 2000n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns false when currencies are not equal', () => {
      const d1 = dinero({ amount: 1000n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintEUR });

      expect(haveSameCurrency([d1, d2])).toBe(false);
    });
    it('returns true when currencies are structurally equal', () => {
      const d1 = dinero({
        amount: 2000n,
        currency: {
          code: 'USD',
          base: 10n,
          exponent: 2n,
        },
      });
      const d2 = dinero({
        amount: 1000n,
        currency: {
          code: 'USD',
          base: 10n,
          exponent: 2n,
        },
      });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns true when multi-base currencies are structurally equal', () => {
      const GBP = { code: 'GBP', base: [20n, 12n], exponent: 1n };
      const d1 = dinero({ amount: 240n, currency: GBP });
      const d2 = dinero({ amount: 240n, currency: GBP });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns true when multi-base currencies compute to the same base', () => {
      const d1 = dinero({
        amount: 240n,
        currency: { code: 'GBP', base: [20n, 12n], exponent: 1n },
      });
      const d2 = dinero({
        amount: 240n,
        currency: { code: 'GBP', base: 240n, exponent: 1n },
      });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it('returns true when currencies are equal', () => {
      const d1 = dinero({ amount: new Big(2000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(1000), currency: bigjsUSD });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns false when currencies are not equal', () => {
      const d1 = dinero({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(1000), currency: bigjsEUR });

      expect(haveSameCurrency([d1, d2])).toBe(false);
    });
    it('returns true when currencies are structurally equal', () => {
      const d1 = dinero({
        amount: new Big(2000),
        currency: {
          code: 'USD',
          base: new Big(10),
          exponent: new Big(2),
        },
      });
      const d2 = dinero({
        amount: new Big(1000),
        currency: {
          code: 'USD',
          base: new Big(10),
          exponent: new Big(2),
        },
      });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns true when multi-base currencies are structurally equal', () => {
      const GBP = {
        code: 'GBP',
        base: [new Big(20), new Big(20)],
        exponent: new Big(1),
      };
      const d1 = dinero({ amount: new Big(240), currency: GBP });
      const d2 = dinero({ amount: new Big(240), currency: GBP });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
    it('returns true when multi-base currencies compute to the same base', () => {
      const d1 = dinero({
        amount: new Big(240),
        currency: {
          code: 'GBP',
          base: [new Big(20), new Big(12)],
          exponent: new Big(1),
        },
      });
      const d2 = dinero({
        amount: new Big(240),
        currency: { code: 'GBP', base: new Big(240), exponent: new Big(1) },
      });

      expect(haveSameCurrency([d1, d2])).toBe(true);
    });
  });
});
