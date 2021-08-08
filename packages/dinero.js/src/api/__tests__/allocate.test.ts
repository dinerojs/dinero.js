import { USD, MGA } from '@dinero.js/currencies';
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

    describe('decimal currencies', () => {
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
    describe('non-decimal currencies', () => {
      it('allocates to percentages', () => {
        const d = dinero({ amount: 5, currency: MGA });
        const shares = allocate(d, [50, 50]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 3,
          currency: MGA,
          scale: 1,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 2,
          currency: MGA,
          scale: 1,
        });
      });
      it('allocates to ratios', () => {
        const d = dinero({ amount: 5, currency: MGA });
        const shares = allocate(d, [1, 3]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 2,
          currency: MGA,
          scale: 1,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 3,
          currency: MGA,
          scale: 1,
        });
      });
      it('ignores zero ratios', () => {
        const d = dinero({ amount: 5, currency: MGA });
        const shares = allocate(d, [0, 50, 50]);
        const [firstAllocated, secondAllocated, thirdAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 0,
          currency: MGA,
          scale: 1,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 3,
          currency: MGA,
          scale: 1,
        });
        expect(toSnapshot(thirdAllocated)).toEqual({
          amount: 2,
          currency: MGA,
          scale: 1,
        });
      });
      it('converts the allocated amounts to the safest scale', () => {
        const d = dinero({ amount: 5, currency: MGA });
        const shares = allocate(d, [
          { amount: 505, scale: 1 },
          { amount: 495, scale: 1 },
        ]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 13,
          currency: MGA,
          scale: 2,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 12,
          currency: MGA,
          scale: 2,
        });
      });
      it('converts the ratios to the same scale before allocating', () => {
        const d = dinero({ amount: 5, currency: MGA });
        const shares = allocate(d, [
          { amount: 5050, scale: 2 },
          { amount: 495, scale: 1 },
        ]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 64,
          currency: MGA,
          scale: 3,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 61,
          currency: MGA,
          scale: 3,
        });
      });
      it('throws when using empty ratios', () => {
        const d = dinero({ amount: 5, currency: MGA });

        expect(() => {
          allocate(d, []);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
      it('throws when using negative ratios', () => {
        const d = dinero({ amount: 5, currency: MGA });

        expect(() => {
          allocate(d, [-50, -50]);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
      it('throws when using only zero ratios', () => {
        const d = dinero({ amount: 5, currency: MGA });

        expect(() => {
          allocate(d, [0, 0]);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintMGA = castToBigintCurrency(MGA);

    describe('decimal currencies', () => {
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
      it('allocates to percentages with large integers', () => {
        const d = dinero({ amount: 1000000000000000025n, currency: bigintUSD });
        const shares = allocate(d, [50n, 50n]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 500000000000000013n,
          currency: bigintUSD,
          scale: 2n,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 500000000000000012n,
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
    describe('non-decimal currencies', () => {
      it('allocates to percentages', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });
        const shares = allocate(d, [50n, 50n]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 3n,
          currency: bigintMGA,
          scale: 1n,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 2n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it('allocates to ratios', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });
        const shares = allocate(d, [1n, 3n]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 2n,
          currency: bigintMGA,
          scale: 1n,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 3n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it('ignores zero ratios', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });
        const shares = allocate(d, [0n, 50n, 50n]);
        const [firstAllocated, secondAllocated, thirdAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 0n,
          currency: bigintMGA,
          scale: 1n,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 3n,
          currency: bigintMGA,
          scale: 1n,
        });
        expect(toSnapshot(thirdAllocated)).toEqual({
          amount: 2n,
          currency: bigintMGA,
          scale: 1n,
        });
      });
      it('converts the allocated amounts to the safest scale', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });
        const shares = allocate(d, [
          { amount: 505n, scale: 1n },
          { amount: 495n, scale: 1n },
        ]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 13n,
          currency: bigintMGA,
          scale: 2n,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 12n,
          currency: bigintMGA,
          scale: 2n,
        });
      });
      it('converts the ratios to the same scale before allocating', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });
        const shares = allocate(d, [
          { amount: 5050n, scale: 2n },
          { amount: 495n, scale: 1n },
        ]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: 64n,
          currency: bigintMGA,
          scale: 3n,
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: 61n,
          currency: bigintMGA,
          scale: 3n,
        });
      });
      it('throws when using empty ratios', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });

        expect(() => {
          allocate(d, []);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
      it('throws when using negative ratios', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });

        expect(() => {
          allocate(d, [-50n, -50n]);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
      it('throws when using only zero ratios', () => {
        const d = dinero({ amount: 5n, currency: bigintMGA });

        expect(() => {
          allocate(d, [0n, 0n]);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsMGA = castToBigjsCurrency(MGA);

    describe('decimal currencies', () => {
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
        const d = dinero({ amount: new Big(100), currency: bigjsUSD });

        expect(() => {
          allocate(d, [new Big(0), new Big(0)]);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
    });
    describe('non-decimal currencies', () => {
      it('allocates to percentages', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });
        const shares = allocate(d, [new Big(50), new Big(50)]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: new Big(3),
          currency: bigjsMGA,
          scale: new Big(1),
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: new Big(2),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it('allocates to percentages with large integers', () => {
        const d = dinero({
          amount: new Big('1000000000000000025'),
          currency: bigjsUSD,
        });
        const shares = allocate(d, [new Big(50), new Big(50)]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: new Big('500000000000000013'),
          currency: bigjsUSD,
          scale: new Big(2),
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: new Big('500000000000000012'),
          currency: bigjsUSD,
          scale: new Big(2),
        });
      });
      it('allocates to ratios', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });
        const shares = allocate(d, [new Big(1), new Big(3)]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: new Big(2),
          currency: bigjsMGA,
          scale: new Big(1),
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: new Big(3),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it('ignores zero ratios', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });
        const shares = allocate(d, [new Big(0), new Big(50), new Big(50)]);
        const [firstAllocated, secondAllocated, thirdAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: new Big(0),
          currency: bigjsMGA,
          scale: new Big(1),
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: new Big(3),
          currency: bigjsMGA,
          scale: new Big(1),
        });
        expect(toSnapshot(thirdAllocated)).toEqual({
          amount: new Big(2),
          currency: bigjsMGA,
          scale: new Big(1),
        });
      });
      it('converts the allocated amounts to the safest scale', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });
        const shares = allocate(d, [
          { amount: new Big(505), scale: new Big(1) },
          { amount: new Big(495), scale: new Big(1) },
        ]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: new Big(13),
          currency: bigjsMGA,
          scale: new Big(2),
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: new Big(12),
          currency: bigjsMGA,
          scale: new Big(2),
        });
      });
      it('converts the ratios to the same scale before allocating', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });
        const shares = allocate(d, [
          { amount: new Big(5050), scale: new Big(2) },
          { amount: new Big(495), scale: new Big(1) },
        ]);
        const [firstAllocated, secondAllocated] = shares;

        expect(toSnapshot(firstAllocated)).toEqual({
          amount: new Big(64),
          currency: bigjsMGA,
          scale: new Big(3),
        });
        expect(toSnapshot(secondAllocated)).toEqual({
          amount: new Big(61),
          currency: bigjsMGA,
          scale: new Big(3),
        });
      });
      it('throws when using empty ratios', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });

        expect(() => {
          allocate(d, []);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
      it('throws when using negative ratios', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });

        expect(() => {
          allocate(d, [new Big(-50), new Big(-50)]);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
      it('throws when using only zero ratios', () => {
        const d = dinero({ amount: new Big(5), currency: bigjsMGA });

        expect(() => {
          allocate(d, [new Big(0), new Big(0)]);
        }).toThrowErrorMatchingInlineSnapshot(
          `"[Dinero.js] Ratios are invalid."`
        );
      });
    });
  });
});
