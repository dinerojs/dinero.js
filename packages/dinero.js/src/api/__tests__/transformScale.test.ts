import { USD, MGA } from '@dinero.js/currencies';
import Big from 'big.js';

import { toSnapshot, transformScale } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('transformScale', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    describe('decimal currencies', () => {
      it('returns a new Dinero object with a new scale and a converted amount', () => {
        const d = dinero({ amount: 500, currency: USD, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 4));

        expect(snapshot).toMatchObject({ amount: 50000, scale: 4 });
      });
      it('returns a new Dinero object with a new scale and a converted, rounded down amount', () => {
        const d = dinero({ amount: 14270, currency: USD, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 0));

        expect(snapshot).toMatchObject({ amount: 142, scale: 0 });
      });
      it('converts between scales correctly', () => {
        const d = dinero({ amount: 333336, currency: USD, scale: 5 });
        const snapshot = toSnapshot(transformScale(d, 2));

        expect(snapshot).toMatchObject({ amount: 333, scale: 2 });
      });
      it('converts from long initial scales correctly', () => {
        const d = dinero({ amount: 3333333336, currency: USD, scale: 9 });
        const snapshot = toSnapshot(transformScale(d, 2));

        expect(snapshot).toMatchObject({ amount: 333, scale: 2 });
      });
      it('uses a custom divide function', () => {
        const divideFn = jest.fn(() => 1045);
        const d = dinero({ amount: 10455, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d, 2, divideFn));

        expect(snapshot).toMatchObject({ amount: 1045, scale: 2 });
        expect(divideFn).toHaveBeenNthCalledWith(
          1,
          10455,
          10,
          expect.objectContaining({
            add: expect.any(Function),
            compare: expect.any(Function),
            decrement: expect.any(Function),
            increment: expect.any(Function),
            integerDivide: expect.any(Function),
            modulo: expect.any(Function),
            multiply: expect.any(Function),
            power: expect.any(Function),
            subtract: expect.any(Function),
            zero: expect.any(Function),
          })
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('returns a new Dinero object with a new scale and a converted amount', () => {
        const d = dinero({ amount: 5, currency: MGA });
        const snapshot = toSnapshot(transformScale(d, 2));

        expect(snapshot).toMatchObject({ amount: 25, scale: 2 });
      });
      it('returns a new Dinero object with a new scale and a converted, rounded down amount', () => {
        const d = dinero({ amount: 26, currency: MGA, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 1));

        expect(snapshot).toMatchObject({ amount: 5, scale: 1 });
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns a new Dinero object with a new scale and a converted amount', () => {
      const d = dinero({ amount: 500n, currency: bigintUSD, scale: 2n });
      const snapshot = toSnapshot(transformScale(d, 4n));

      expect(snapshot).toMatchObject({ amount: 50000n, scale: 4n });
    });
    it('returns a new Dinero object with a new scale and a converted, rounded down amount', () => {
      const d = dinero({ amount: 14270n, currency: bigintUSD, scale: 2n });
      const snapshot = toSnapshot(transformScale(d, 0n));

      expect(snapshot).toMatchObject({ amount: 142n, scale: 0n });
    });
    it('converts between scales correctly', () => {
      const d = dinero({ amount: 333336n, currency: bigintUSD, scale: 5n });
      const snapshot = toSnapshot(transformScale(d, 2n));

      expect(snapshot).toMatchObject({ amount: 333n, scale: 2n });
    });
    it('converts from long initial scales correctly', () => {
      const d = dinero({ amount: 3333333336n, currency: bigintUSD, scale: 9n });
      const snapshot = toSnapshot(transformScale(d, 2n));

      expect(snapshot).toMatchObject({ amount: 333n, scale: 2n });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns a new Dinero object with a new scale and a converted amount', () => {
      const d = dinero({
        amount: new Big(500),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      const snapshot = toSnapshot(transformScale(d, new Big(4)));

      expect(snapshot).toMatchObject({
        amount: new Big(50000),
        scale: new Big(4),
      });
    });
    it('returns a new Dinero object with a new scale and a converted, rounded down amount', () => {
      const d = dinero({
        amount: new Big(14270),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      const snapshot = toSnapshot(transformScale(d, new Big(0)));

      expect(snapshot).toMatchObject({
        amount: new Big(142),
        scale: new Big(0),
      });
    });
    it('converts between scales correctly', () => {
      const d = dinero({
        amount: new Big(333336),
        currency: bigjsUSD,
        scale: new Big(5),
      });
      const snapshot = toSnapshot(transformScale(d, new Big(2)));

      expect(snapshot).toMatchObject({
        amount: new Big(333),
        scale: new Big(2),
      });
    });
    it('converts from long initial scales correctly', () => {
      const d = dinero({
        amount: new Big(3333333336),
        currency: bigjsUSD,
        scale: new Big(9),
      });
      const snapshot = toSnapshot(transformScale(d, new Big(2)));

      expect(snapshot).toMatchObject({
        amount: new Big(333),
        scale: new Big(2),
      });
    });
  });
});
