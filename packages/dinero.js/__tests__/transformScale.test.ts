import {
  down,
  halfAwayFromZero,
  halfDown,
  halfEven,
  halfOdd,
  halfTowardsZero,
  halfUp,
  up,
} from '@dinero.js/core';
import { USD, MGA } from '@dinero.js/currencies';
import Big from 'big.js';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from 'test-utils';

import { toSnapshot, transformScale } from '..';

const ABC = { code: 'ABC', base: 6, exponent: 1 };

type DivideOperation = Parameters<typeof transformScale>[2];

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
      it('uses the provided `up` divide function', () => {
        const d = dinero({ amount: 10455, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d, 2, up));

        expect(snapshot).toMatchObject({ amount: 1046, scale: 2 });
      });
      it('uses the provided `down` divide function', () => {
        const d = dinero({ amount: 10455, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d, 2, down));

        expect(snapshot).toMatchObject({ amount: 1045, scale: 2 });
      });
      it('uses the provided `halfOdd` divide function', () => {
        const d1 = dinero({ amount: 10415, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10425, currency: USD, scale: 3 });

        expect(toSnapshot(transformScale(d1, 2, halfOdd))).toMatchObject({
          amount: 1041,
          scale: 2,
        });
        expect(toSnapshot(transformScale(d2, 2, halfOdd))).toMatchObject({
          amount: 1043,
          scale: 2,
        });
      });
      it('uses the provided `halfEven` divide function', () => {
        const d1 = dinero({ amount: 10425, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10435, currency: USD, scale: 3 });

        expect(toSnapshot(transformScale(d1, 2, halfEven))).toMatchObject({
          amount: 1042,
          scale: 2,
        });
        expect(toSnapshot(transformScale(d2, 2, halfEven))).toMatchObject({
          amount: 1044,
          scale: 2,
        });
      });
      it('uses the provided `halfDown` divide function', () => {
        const d1 = dinero({ amount: 10455, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10456, currency: USD, scale: 3 });

        expect(toSnapshot(transformScale(d1, 2, halfDown))).toMatchObject({
          amount: 1045,
          scale: 2,
        });
        expect(toSnapshot(transformScale(d2, 2, halfDown))).toMatchObject({
          amount: 1046,
          scale: 2,
        });
      });
      it('uses the provided `halfUp` divide function', () => {
        const d1 = dinero({ amount: 10454, currency: USD, scale: 3 });
        const d2 = dinero({ amount: 10455, currency: USD, scale: 3 });

        expect(toSnapshot(transformScale(d1, 2, halfUp))).toMatchObject({
          amount: 1045,
          scale: 2,
        });
        expect(toSnapshot(transformScale(d2, 2, halfUp))).toMatchObject({
          amount: 1046,
          scale: 2,
        });
      });
      it('uses the provided `halfTowardsZero` divide function', () => {
        const d1 = dinero({ amount: 10415, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d1, 2, halfTowardsZero));

        expect(snapshot).toMatchObject({
          amount: 1041,
          scale: 2,
        });
      });
      it('uses the provided `halfAwayFromZero` divide function', () => {
        const d1 = dinero({ amount: 10415, currency: USD, scale: 3 });

        const snapshot = toSnapshot(transformScale(d1, 2, halfAwayFromZero));

        expect(snapshot).toMatchObject({
          amount: 1042,
          scale: 2,
        });
      });
      it('uses a custom divide function', () => {
        const divideFn = jest.fn(() => 1045) as DivideOperation;
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
      it('uses the provided `up` divide function', () => {
        const d = dinero({ amount: 33, currency: ABC, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 1, up));

        expect(snapshot).toMatchObject({ amount: 6, scale: 1 });
      });
      it('uses the provided `down` divide function', () => {
        const d = dinero({ amount: 33, currency: ABC, scale: 2 });
        const snapshot = toSnapshot(transformScale(d, 1, down));

        expect(snapshot).toMatchObject({ amount: 5, scale: 1 });
      });
      it('uses the provided `halfOdd` divide function', () => {
        const d1 = dinero({ amount: 33, currency: ABC, scale: 2 });
        const d2 = dinero({ amount: 39, currency: ABC, scale: 2 });

        expect(toSnapshot(transformScale(d1, 1, halfOdd))).toMatchObject({
          amount: 5,
          scale: 1,
        });
        expect(toSnapshot(transformScale(d2, 1, halfOdd))).toMatchObject({
          amount: 7,
          scale: 1,
        });
      });
      it('uses the provided `halfEven` divide function', () => {
        const d1 = dinero({ amount: 33, currency: ABC, scale: 2 });
        const d2 = dinero({ amount: 39, currency: ABC, scale: 2 });

        expect(toSnapshot(transformScale(d1, 1, halfEven))).toMatchObject({
          amount: 6,
          scale: 1,
        });
        expect(toSnapshot(transformScale(d2, 1, halfEven))).toMatchObject({
          amount: 6,
          scale: 1,
        });
      });
      it('uses the provided `halfDown` divide function', () => {
        const d1 = dinero({ amount: 33, currency: ABC, scale: 2 });
        const d2 = dinero({ amount: 39, currency: ABC, scale: 2 });

        expect(toSnapshot(transformScale(d1, 1, halfDown))).toMatchObject({
          amount: 5,
          scale: 1,
        });
        expect(toSnapshot(transformScale(d2, 1, halfDown))).toMatchObject({
          amount: 6,
          scale: 1,
        });
      });
      it('uses the provided `halfUp` divide function', () => {
        const d1 = dinero({ amount: 33, currency: ABC, scale: 2 });
        const d2 = dinero({ amount: 39, currency: ABC, scale: 2 });

        expect(toSnapshot(transformScale(d1, 1, halfUp))).toMatchObject({
          amount: 6,
          scale: 1,
        });
        expect(toSnapshot(transformScale(d2, 1, halfUp))).toMatchObject({
          amount: 7,
          scale: 1,
        });
      });
      it('uses the provided `halfTowardsZero` divide function', () => {
        const d1 = dinero({ amount: 33, currency: ABC, scale: 2 });
        const d2 = dinero({ amount: 39, currency: ABC, scale: 2 });

        expect(
          toSnapshot(transformScale(d1, 1, halfTowardsZero))
        ).toMatchObject({
          amount: 5,
          scale: 1,
        });
        expect(
          toSnapshot(transformScale(d2, 1, halfTowardsZero))
        ).toMatchObject({
          amount: 6,
          scale: 1,
        });
      });
      it('uses the provided `halfAwayFromZero` divide function', () => {
        const d1 = dinero({ amount: 33, currency: ABC, scale: 2 });
        const d2 = dinero({ amount: 39, currency: ABC, scale: 2 });

        expect(
          toSnapshot(transformScale(d1, 1, halfAwayFromZero))
        ).toMatchObject({
          amount: 6,
          scale: 1,
        });
        expect(
          toSnapshot(transformScale(d2, 1, halfAwayFromZero))
        ).toMatchObject({
          amount: 7,
          scale: 1,
        });
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintMGA = castToBigintCurrency(MGA);
    const bigintABC = castToBigintCurrency(ABC);

    describe('decimal currencies', () => {
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
        const d = dinero({
          amount: 3333333336n,
          currency: bigintUSD,
          scale: 9n,
        });
        const snapshot = toSnapshot(transformScale(d, 2n));

        expect(snapshot).toMatchObject({ amount: 333n, scale: 2n });
      });
      it('uses the provided `up` divide function', () => {
        const d = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d, 2n, up));

        expect(snapshot).toMatchObject({ amount: 1046n, scale: 2n });
      });
      it('uses the provided `down` divide function', () => {
        const d = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d, 2n, down));

        expect(snapshot).toMatchObject({ amount: 1045n, scale: 2n });
      });
      it('uses the provided `halfOdd` divide function', () => {
        const d1 = dinero({ amount: 10415n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10425n, currency: bigintUSD, scale: 3n });

        expect(toSnapshot(transformScale(d1, 2n, halfOdd))).toMatchObject({
          amount: 1041n,
          scale: 2n,
        });
        expect(toSnapshot(transformScale(d2, 2n, halfOdd))).toMatchObject({
          amount: 1043n,
          scale: 2n,
        });
      });
      it('uses the provided `halfEven` divide function', () => {
        const d1 = dinero({ amount: 10425n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10435n, currency: bigintUSD, scale: 3n });

        expect(toSnapshot(transformScale(d1, 2n, halfEven))).toMatchObject({
          amount: 1042n,
          scale: 2n,
        });
        expect(toSnapshot(transformScale(d2, 2n, halfEven))).toMatchObject({
          amount: 1044n,
          scale: 2n,
        });
      });
      it('uses the provided `halfDown` divide function', () => {
        const d1 = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10456n, currency: bigintUSD, scale: 3n });

        expect(toSnapshot(transformScale(d1, 2n, halfDown))).toMatchObject({
          amount: 1045n,
          scale: 2n,
        });
        expect(toSnapshot(transformScale(d2, 2n, halfDown))).toMatchObject({
          amount: 1046n,
          scale: 2n,
        });
      });
      it('uses the provided `halfUp` divide function', () => {
        const d1 = dinero({ amount: 10454n, currency: bigintUSD, scale: 3n });
        const d2 = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        expect(toSnapshot(transformScale(d1, 2n, halfUp))).toMatchObject({
          amount: 1045n,
          scale: 2n,
        });
        expect(toSnapshot(transformScale(d2, 2n, halfUp))).toMatchObject({
          amount: 1046n,
          scale: 2n,
        });
      });
      it('uses the provided `halfTowardsZero` divide function', () => {
        const d1 = dinero({ amount: 10415n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d1, 2n, halfTowardsZero));

        expect(snapshot).toMatchObject({
          amount: 1041n,
          scale: 2n,
        });
      });
      it('uses the provided `halfAwayFromZero` divide function', () => {
        const d1 = dinero({ amount: 10415n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d1, 2n, halfAwayFromZero));

        expect(snapshot).toMatchObject({
          amount: 1042n,
          scale: 2n,
        });
      });
      it('uses a custom divide function', () => {
        const divideFn = jest.fn(() => 1045n) as DivideOperation;
        const d = dinero({ amount: 10455n, currency: bigintUSD, scale: 3n });

        const snapshot = toSnapshot(transformScale(d, 2n, divideFn));

        expect(snapshot).toMatchObject({ amount: 1045n, scale: 2n });
        expect(divideFn).toHaveBeenNthCalledWith(
          1,
          10455n,
          10n,
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
        const d = dinero({ amount: 5n, currency: bigintMGA });
        const snapshot = toSnapshot(transformScale(d, 2n));

        expect(snapshot).toMatchObject({ amount: 25n, scale: 2n });
      });
      it('returns a new Dinero object with a new scale and a converted, rounded down amount', () => {
        const d = dinero({ amount: 26n, currency: bigintMGA, scale: 2n });
        const snapshot = toSnapshot(transformScale(d, 1n));

        expect(snapshot).toMatchObject({ amount: 5n, scale: 1n });
      });
      it('uses the provided `up` divide function', () => {
        const d = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const snapshot = toSnapshot(transformScale(d, 1n, up));

        expect(snapshot).toMatchObject({ amount: 6n, scale: 1n });
      });
      it('uses the provided `down` divide function', () => {
        const d = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const snapshot = toSnapshot(transformScale(d, 1n, down));

        expect(snapshot).toMatchObject({ amount: 5n, scale: 1n });
      });
      it('uses the provided `halfOdd` divide function', () => {
        const d1 = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const d2 = dinero({ amount: 39n, currency: bigintABC, scale: 2n });

        expect(toSnapshot(transformScale(d1, 1n, halfOdd))).toMatchObject({
          amount: 5n,
          scale: 1n,
        });
        expect(toSnapshot(transformScale(d2, 1n, halfOdd))).toMatchObject({
          amount: 7n,
          scale: 1n,
        });
      });
      it('uses the provided `halfEven` divide function', () => {
        const d1 = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const d2 = dinero({ amount: 39n, currency: bigintABC, scale: 2n });

        expect(toSnapshot(transformScale(d1, 1n, halfEven))).toMatchObject({
          amount: 6n,
          scale: 1n,
        });
        expect(toSnapshot(transformScale(d2, 1n, halfEven))).toMatchObject({
          amount: 6n,
          scale: 1n,
        });
      });
      it('uses the provided `halfDown` divide function', () => {
        const d1 = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const d2 = dinero({ amount: 39n, currency: bigintABC, scale: 2n });

        expect(toSnapshot(transformScale(d1, 1n, halfDown))).toMatchObject({
          amount: 5n,
          scale: 1n,
        });
        expect(toSnapshot(transformScale(d2, 1n, halfDown))).toMatchObject({
          amount: 6n,
          scale: 1n,
        });
      });
      it('uses the provided `halfUp` divide function', () => {
        const d1 = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const d2 = dinero({ amount: 39n, currency: bigintABC, scale: 2n });

        expect(toSnapshot(transformScale(d1, 1n, halfUp))).toMatchObject({
          amount: 6n,
          scale: 1n,
        });
        expect(toSnapshot(transformScale(d2, 1n, halfUp))).toMatchObject({
          amount: 7n,
          scale: 1n,
        });
      });
      it('uses the provided `halfTowardsZero` divide function', () => {
        const d1 = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const d2 = dinero({ amount: 39n, currency: bigintABC, scale: 2n });

        expect(
          toSnapshot(transformScale(d1, 1n, halfTowardsZero))
        ).toMatchObject({
          amount: 5n,
          scale: 1n,
        });
        expect(
          toSnapshot(transformScale(d2, 1n, halfTowardsZero))
        ).toMatchObject({
          amount: 6n,
          scale: 1n,
        });
      });
      it('uses the provided `halfAwayFromZero` divide function', () => {
        const d1 = dinero({ amount: 33n, currency: bigintABC, scale: 2n });
        const d2 = dinero({ amount: 39n, currency: bigintABC, scale: 2n });

        expect(
          toSnapshot(transformScale(d1, 1n, halfAwayFromZero))
        ).toMatchObject({
          amount: 6n,
          scale: 1n,
        });
        expect(
          toSnapshot(transformScale(d2, 1n, halfAwayFromZero))
        ).toMatchObject({
          amount: 7n,
          scale: 1n,
        });
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsMGA = castToBigjsCurrency(MGA);
    const bigjsABC = castToBigjsCurrency(ABC);

    describe('decimal currencies', () => {
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
      it('uses the provided `up` divide function', () => {
        const d = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(transformScale(d, new Big(2), up));

        expect(snapshot).toMatchObject({
          amount: new Big(1046),
          scale: new Big(2),
        });
      });
      it('uses the provided `down` divide function', () => {
        const d = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(transformScale(d, new Big(2), down));

        expect(snapshot).toMatchObject({
          amount: new Big(1045),
          scale: new Big(2),
        });
      });
      it('uses the provided `halfOdd` divide function', () => {
        const d1 = dinero({
          amount: new Big(10415),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10425),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(2), halfOdd))
        ).toMatchObject({
          amount: new Big(1041),
          scale: new Big(2),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(2), halfOdd))
        ).toMatchObject({
          amount: new Big(1043),
          scale: new Big(2),
        });
      });
      it('uses the provided `halfEven` divide function', () => {
        const d1 = dinero({
          amount: new Big(10425),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10435),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(2), halfEven))
        ).toMatchObject({
          amount: new Big(1042),
          scale: new Big(2),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(2), halfEven))
        ).toMatchObject({
          amount: new Big(1044),
          scale: new Big(2),
        });
      });
      it('uses the provided `halfDown` divide function', () => {
        const d1 = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10456),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(2), halfDown))
        ).toMatchObject({
          amount: new Big(1045),
          scale: new Big(2),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(2), halfDown))
        ).toMatchObject({
          amount: new Big(1046),
          scale: new Big(2),
        });
      });
      it('uses the provided `halfUp` divide function', () => {
        const d1 = dinero({
          amount: new Big(10454),
          currency: bigjsUSD,
          scale: new Big(3),
        });
        const d2 = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(2), halfUp))
        ).toMatchObject({
          amount: new Big(1045),
          scale: new Big(2),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(2), halfUp))
        ).toMatchObject({
          amount: new Big(1046),
          scale: new Big(2),
        });
      });
      it('uses the provided `halfTowardsZero` divide function', () => {
        const d1 = dinero({
          amount: new Big(10415),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(
          transformScale(d1, new Big(2), halfTowardsZero)
        );

        expect(snapshot).toMatchObject({
          amount: new Big(1041),
          scale: new Big(2),
        });
      });
      it('uses the provided `halfAwayFromZero` divide function', () => {
        const d1 = dinero({
          amount: new Big(10415),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(
          transformScale(d1, new Big(2), halfAwayFromZero)
        );

        expect(snapshot).toMatchObject({
          amount: new Big(1042),
          scale: new Big(2),
        });
      });
      it('uses a custom divide function', () => {
        const divideFn = jest.fn(() => new Big(1045)) as DivideOperation;
        const d = dinero({
          amount: new Big(10455),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        const snapshot = toSnapshot(transformScale(d, new Big(2), divideFn));

        expect(snapshot).toMatchObject({
          amount: new Big(1045),
          scale: new Big(2),
        });
        expect(divideFn).toHaveBeenNthCalledWith(
          1,
          new Big(10455),
          new Big(10),
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
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });
        const snapshot = toSnapshot(transformScale(d, new Big(2)));

        expect(snapshot).toMatchObject({
          amount: new Big(25),
          scale: new Big(2),
        });
      });
      it('returns a new Dinero object with a new scale and a converted, rounded down amount', () => {
        const d = dinero({
          amount: new Big(26),
          currency: bigjsMGA,
          scale: new Big(2),
        });
        const snapshot = toSnapshot(transformScale(d, new Big(1)));

        expect(snapshot).toMatchObject({
          amount: new Big(5),
          scale: new Big(1),
        });
      });
      it('uses the provided `up` divide function', () => {
        const d = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const snapshot = toSnapshot(transformScale(d, new Big(1), up));

        expect(snapshot).toMatchObject({
          amount: new Big(6),
          scale: new Big(1),
        });
      });
      it('uses the provided `down` divide function', () => {
        const d = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const snapshot = toSnapshot(transformScale(d, new Big(1), down));

        expect(snapshot).toMatchObject({
          amount: new Big(5),
          scale: new Big(1),
        });
      });
      it('uses the provided `halfOdd` divide function', () => {
        const d1 = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const d2 = dinero({
          amount: new Big(39),
          currency: bigjsABC,
          scale: new Big(2),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(1), halfOdd))
        ).toMatchObject({
          amount: new Big(5),
          scale: new Big(1),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(1), halfOdd))
        ).toMatchObject({
          amount: new Big(7),
          scale: new Big(1),
        });
      });
      it('uses the provided `halfEven` divide function', () => {
        const d1 = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const d2 = dinero({
          amount: new Big(39),
          currency: bigjsABC,
          scale: new Big(2),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(1), halfEven))
        ).toMatchObject({
          amount: new Big(6),
          scale: new Big(1),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(1), halfEven))
        ).toMatchObject({
          amount: new Big(6),
          scale: new Big(1),
        });
      });
      it('uses the provided `halfDown` divide function', () => {
        const d1 = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const d2 = dinero({
          amount: new Big(39),
          currency: bigjsABC,
          scale: new Big(2),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(1), halfDown))
        ).toMatchObject({
          amount: new Big(5),
          scale: new Big(1),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(1), halfDown))
        ).toMatchObject({
          amount: new Big(6),
          scale: new Big(1),
        });
      });
      it('uses the provided `halfUp` divide function', () => {
        const d1 = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const d2 = dinero({
          amount: new Big(39),
          currency: bigjsABC,
          scale: new Big(2),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(1), halfUp))
        ).toMatchObject({
          amount: new Big(6),
          scale: new Big(1),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(1), halfUp))
        ).toMatchObject({
          amount: new Big(7),
          scale: new Big(1),
        });
      });
      it('uses the provided `halfTowardsZero` divide function', () => {
        const d1 = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const d2 = dinero({
          amount: new Big(39),
          currency: bigjsABC,
          scale: new Big(2),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(1), halfTowardsZero))
        ).toMatchObject({
          amount: new Big(5),
          scale: new Big(1),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(1), halfTowardsZero))
        ).toMatchObject({
          amount: new Big(6),
          scale: new Big(1),
        });
      });
      it('uses the provided `halfAwayFromZero` divide function', () => {
        const d1 = dinero({
          amount: new Big(33),
          currency: bigjsABC,
          scale: new Big(2),
        });
        const d2 = dinero({
          amount: new Big(39),
          currency: bigjsABC,
          scale: new Big(2),
        });

        expect(
          toSnapshot(transformScale(d1, new Big(1), halfAwayFromZero))
        ).toMatchObject({
          amount: new Big(6),
          scale: new Big(1),
        });
        expect(
          toSnapshot(transformScale(d2, new Big(1), halfAwayFromZero))
        ).toMatchObject({
          amount: new Big(7),
          scale: new Big(1),
        });
      });
    });
  });
});
