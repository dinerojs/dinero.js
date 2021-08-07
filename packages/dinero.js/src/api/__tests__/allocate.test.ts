import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { allocate, toSnapshot } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('allocate', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('allocates to percentages', () => {
      const d = dinero({ amount: 1003, currency: USD });
      const shares = allocate(d, [50, 50]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 502,
        currency: USD,
        scale: 2,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 501,
        currency: USD,
        scale: 2,
      });
    });
    it('allocates to ratios', () => {
      const d = dinero({ amount: 100, currency: USD });
      const shares = allocate(d, [1, 3]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 25,
        currency: USD,
        scale: 2,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 75,
        currency: USD,
        scale: 2,
      });
    });
    it('ignores zero ratios', () => {
      const d = dinero({ amount: 1003, currency: USD });
      const shares = allocate(d, [0, 50, 50]);
      const [firstAllocated, secondAllocated, thirdAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 0,
        currency: USD,
        scale: 2,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 502,
        currency: USD,
        scale: 2,
      });
      expect(toSnapshot(thirdAllocated)).toEqual({
        amount: 501,
        currency: USD,
        scale: 2,
      });
    });
    it('converts the allocated amounts to the safest scale', () => {
      const d = dinero({ amount: 100, currency: USD });
      const shares = allocate(d, [
        { amount: 505, scale: 1 },
        { amount: 495, scale: 1 },
      ]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 505,
        currency: USD,
        scale: 3,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 495,
        currency: USD,
        scale: 3,
      });
    });
    it('converts the ratios to the same scale before allocating', () => {
      const d = dinero({ amount: 100, currency: USD });
      const shares = allocate(d, [
        { amount: 5050, scale: 2 },
        { amount: 495, scale: 1 },
      ]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 5050,
        currency: USD,
        scale: 4,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 4950,
        currency: USD,
        scale: 4,
      });
    });
    it('throws when using empty ratios', () => {
      const d = dinero({ amount: 100, currency: USD });

      expect(() => {
        allocate(d, []);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
    it('throws when using negative ratios', () => {
      const d = dinero({ amount: 100, currency: USD });

      expect(() => {
        allocate(d, [-50, -50]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
    it('throws when using only zero ratios', () => {
      const d = dinero({ amount: 100, currency: USD });

      expect(() => {
        allocate(d, [0, 0]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('allocates to percentages', () => {
      const d = dinero({ amount: 1003n, currency: bigintUSD });
      const shares = allocate(d, [50n, 50n]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 502n,
        currency: bigintUSD,
        scale: 2n,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 501n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('allocates to ratios', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });
      const shares = allocate(d, [1n, 3n]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 25n,
        currency: bigintUSD,
        scale: 2n,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 75n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('ignores zero ratios', () => {
      const d = dinero({ amount: 1003n, currency: bigintUSD });
      const shares = allocate(d, [0n, 50n, 50n]);
      const [firstAllocated, secondAllocated, thirdAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 0n,
        currency: bigintUSD,
        scale: 2n,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 502n,
        currency: bigintUSD,
        scale: 2n,
      });
      expect(toSnapshot(thirdAllocated)).toEqual({
        amount: 501n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it('converts the allocated amounts to the safest scale', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });
      const shares = allocate(d, [
        { amount: 505n, scale: 1n },
        { amount: 495n, scale: 1n },
      ]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 505n,
        currency: bigintUSD,
        scale: 3n,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 495n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
    it('converts the ratios to the same scale before allocating', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });
      const shares = allocate(d, [
        { amount: 5050n, scale: 2n },
        { amount: 495n, scale: 1n },
      ]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: 5050n,
        currency: bigintUSD,
        scale: 4n,
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: 4950n,
        currency: bigintUSD,
        scale: 4n,
      });
    });
    it('throws when using empty ratios', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });

      expect(() => {
        allocate(d, []);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
    it('throws when using negative ratios', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });

      expect(() => {
        allocate(d, [-50n, -50n]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
    it('throws when using only zero ratios', () => {
      const d = dinero({ amount: 100n, currency: bigintUSD });

      expect(() => {
        allocate(d, [0n, 0n]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('allocates to percentages', () => {
      const d = dinero({ amount: new Big(1003), currency: bigjsUSD });
      const shares = allocate(d, [new Big(50), new Big(50)]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: new Big(502),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: new Big(501),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it('allocates to ratios', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });
      const shares = allocate(d, [new Big(1), new Big(3)]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: new Big(25),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: new Big(75),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it('ignores zero ratios', () => {
      const d = dinero({ amount: new Big(1003), currency: bigjsUSD });
      const shares = allocate(d, [new Big(0), new Big(50), new Big(50)]);
      const [firstAllocated, secondAllocated, thirdAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: new Big(0),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: new Big(502),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      expect(toSnapshot(thirdAllocated)).toEqual({
        amount: new Big(501),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it('converts the allocated amounts to the safest scale', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });
      const shares = allocate(d, [
        { amount: new Big(505), scale: new Big(1) },
        { amount: new Big(495), scale: new Big(1) },
      ]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: new Big(505),
        currency: bigjsUSD,
        scale: new Big(3),
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: new Big(495),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
    it('converts the ratios to the same scale before allocating', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });
      const shares = allocate(d, [
        { amount: new Big(5050), scale: new Big(2) },
        { amount: new Big(495), scale: new Big(1) },
      ]);
      const [firstAllocated, secondAllocated] = shares;

      expect(toSnapshot(firstAllocated)).toEqual({
        amount: new Big(5050),
        currency: bigjsUSD,
        scale: new Big(4),
      });
      expect(toSnapshot(secondAllocated)).toEqual({
        amount: new Big(4950),
        currency: bigjsUSD,
        scale: new Big(4),
      });
    });
    it('throws when using empty ratios', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });

      expect(() => {
        allocate(d, []);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
    it('throws when using negative ratios', () => {
      const d = dinero({ amount: new Big(100), currency: bigjsUSD });

      expect(() => {
        allocate(d, [new Big(-50), new Big(-50)]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
    it('throws when using only zero ratios', () => {
      const d = dinero({ amount: 100, currency: bigjsUSD });

      expect(() => {
        allocate(d, [new Big(0), new Big(0)]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"[Dinero.js] Ratios are invalid."`
      );
    });
  });
});
