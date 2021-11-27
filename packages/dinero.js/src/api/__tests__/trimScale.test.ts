import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { toSnapshot, trimScale } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('trimScale', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it("trims a Dinero object down to its currency exponent's scale", () => {
      const d = dinero({ amount: 500000, currency: USD, scale: 5 });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({ amount: 500, scale: 2 });
    });
    it('trims a Dinero object down to the safest possible scale', () => {
      const d = dinero({ amount: 55550, currency: USD, scale: 4 });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({ amount: 5555, scale: 3 });
    });
    it("doesn't trim the scale when there's nothing to trim", () => {
      const d = dinero({ amount: 5555, currency: USD, scale: 3 });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({ amount: 5555, scale: 3 });
    });
    it("doesn't crash on zero amounts", () => {
      const d = dinero({ amount: 0, currency: USD });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({
        amount: 0,
        scale: 2,
        currency: USD,
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it("trims a Dinero object down to its currency exponent's scale", () => {
      const d = dinero({ amount: 500000n, currency: bigintUSD, scale: 5n });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({ amount: 500n, scale: 2n });
    });
    it('trims a Dinero object down to the safest possible scale', () => {
      const d = dinero({ amount: 55550n, currency: bigintUSD, scale: 4n });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({ amount: 5555n, scale: 3n });
    });
    it("doesn't trim the scale when there's nothing to trim", () => {
      const d = dinero({ amount: 5555n, currency: bigintUSD, scale: 3n });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({ amount: 5555n, scale: 3n });
    });
    it("doesn't crash on zero amounts", () => {
      const d = dinero({ amount: 0n, currency: bigintUSD });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({
        amount: 0n,
        scale: 2n,
        currency: bigintUSD,
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("trims a Dinero object down to its currency exponent's scale", () => {
      const d = dinero({
        amount: new Big(500000),
        currency: bigjsUSD,
        scale: new Big(5),
      });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({
        amount: new Big(500),
        scale: new Big(2),
      });
    });
    it('trims a Dinero object down to the safest possible scale', () => {
      const d = dinero({
        amount: new Big(55550),
        currency: bigjsUSD,
        scale: new Big(4),
      });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({
        amount: new Big(5555),
        scale: new Big(3),
      });
    });
    it("doesn't trim the scale when there's nothing to trim", () => {
      const d = dinero({
        amount: new Big(5555),
        currency: bigjsUSD,
        scale: new Big(3),
      });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({
        amount: new Big(5555),
        scale: new Big(3),
      });
    });
    it("doesn't crash on zero amounts", () => {
      const d = dinero({ amount: new Big(0), currency: bigjsUSD });
      const snapshot = toSnapshot(trimScale(d));

      expect(snapshot).toMatchObject({
        amount: new Big(0),
        scale: new Big(2),
        currency: bigjsUSD,
      });
    });
  });
});
