import { eur as EUR, usd as USD } from '@dinero.js/currencies';
import Big from 'big.js';
import { castToBigintCurrency } from '../lib/es6/src/test-utils/castToBigintCurrency.js';
import { castToBigjsCurrency } from '../lib/es6/src/test-utils/castToBigjsCurrency.js';
import { createNumberDinero } from '../lib/es6/src/test-utils/createNumberDinero.js';
import { createBigintDinero } from '../lib/es6/src/test-utils/createBigintDinero.js';
import { createBigjsDinero } from '../lib/es6/src/test-utils/createBigjsDinero.js';

import { subtract, toSnapshot } from '..';

describe('subtract', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('subtracts positive Dinero objects', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 400,
        currency: USD,
        scale: 2,
      });
    });
    it('subtracts negative Dinero objects', () => {
      const d1 = dinero({ amount: -500, currency: USD });
      const d2 = dinero({ amount: -100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: -400,
        currency: USD,
        scale: 2,
      });
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 4000,
        currency: USD,
        scale: 3,
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: EUR });

      expect(() => {
        subtract(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `[Error: Objects must have the same currency.]`
      );
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it('subtracts positive Dinero objects', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 100n, currency: bigintUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 400n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('subtracts negative Dinero objects', () => {
      const d1 = dinero({ amount: -500n, currency: bigintUSD });
      const d2 = dinero({ amount: -100n, currency: bigintUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: -400n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 4000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 100n, currency: bigintEUR });

      expect(() => {
        subtract(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `[Error: Objects must have the same currency.]`
      );
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it('subtracts positive Dinero objects', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(100), currency: bigjsUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(400),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it('subtracts negative Dinero objects', () => {
      const d1 = dinero({ amount: new Big(-500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(-100), currency: bigjsUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(-400),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(4000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(100), currency: bigjsEUR });

      expect(() => {
        subtract(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `[Error: Objects must have the same currency.]`
      );
    });
  });
});
