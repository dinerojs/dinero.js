import { EUR, USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { add, toSnapshot } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('add', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('adds up positive Dinero objects', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: USD });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: 600,
        currency: USD,
        scale: 2,
      });
    });
    it('adds up negative Dinero objects', () => {
      const d1 = dinero({ amount: -500, currency: USD });
      const d2 = dinero({ amount: -100, currency: USD });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: -600,
        currency: USD,
        scale: 2,
      });
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: 6000,
        currency: USD,
        scale: 3,
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 500, currency: USD });
      const d2 = dinero({ amount: 100, currency: EUR });

      expect(() => {
        add(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it('adds up positive Dinero objects', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 100n, currency: bigintUSD });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: 600n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('adds up negative Dinero objects', () => {
      const d1 = dinero({ amount: -500n, currency: bigintUSD });
      const d2 = dinero({ amount: -100n, currency: bigintUSD });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: -600n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('normalizes the result to the highest scale', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: 6000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: 500n, currency: bigintUSD });
      const d2 = dinero({ amount: 100n, currency: bigintEUR });

      expect(() => {
        add(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it('adds up positive Dinero objects', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(100), currency: bigjsUSD });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(600),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it('adds up negative Dinero objects', () => {
      const d1 = dinero({ amount: new Big(-500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(-100), currency: bigjsUSD });

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(-600),
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

      const snapshot = toSnapshot(add(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(6000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
    it('throws when using different currencies', () => {
      const d1 = dinero({ amount: new Big(500), currency: bigjsUSD });
      const d2 = dinero({ amount: new Big(100), currency: bigjsEUR });

      expect(() => {
        add(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Objects must have the same currency."`
      );
    });
  });
});
