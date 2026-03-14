import * as fc from 'fast-check';

import { calculator } from '../../../calculator/number';

import { distribute } from '../distribute';

const distributeFn = distribute(calculator);

describe('distribute', () => {
  it('distributes to percentages', () => {
    expect(distributeFn(1003, [50, 50])).toEqual([502, 501]);
  });
  it('distributes to ratios', () => {
    expect(distributeFn(100, [1, 3])).toEqual([25, 75]);
  });
  it('distributes negative amounts', () => {
    expect(distributeFn(-1003, [50, 50])).toEqual([-502, -501]);
  });
  it('distributes while ignoring zero ratios', () => {
    expect(distributeFn(1003, [0, 50, 50])).toEqual([0, 502, 501]);
  });
  it('distributes to zero ratios', () => {
    expect(distributeFn(1003, [0, 0])).toEqual([0, 0]);
  });
  it('distributes to negative ratios', () => {
    expect(distributeFn(1003, [-50, -50])).toEqual([502, 501]);
  });
  it('distributes negative amounts to negative ratios', () => {
    expect(distributeFn(-1003, [-50, -50])).toEqual([-502, -501]);
  });
  it('distributes to empty ratios', () => {
    expect(distributeFn(1003, [])).toEqual([]);
  });
  it('distributes remainder to largest ratio first', () => {
    expect(distributeFn(5, [100, 101, 100, 100])).toEqual([1, 2, 1, 1]);
  });
  it('distributes remainder to multiple largest ratios in order', () => {
    expect(distributeFn(801, [1, 3])).toEqual([200, 601]);
  });
  it('does not hang with amounts larger than `MAX_SAFE_INTEGER`', () => {
    const largeAmount = 337582417582417600000; // > Number.MAX_SAFE_INTEGER
    const result = distributeFn(largeAmount, [50, 50]);

    // We don't assert exact values since precision is lost,
    // but the function should return without hanging
    expect(result).toHaveLength(2);
    expect(result[0] + result[1]).toBe(largeAmount);
  });
  describe('properties', () => {
    const safeAmount = fc.integer({ min: -100000, max: 100000 });
    const positiveRatios = fc.array(fc.integer({ min: 1, max: 100 }), {
      minLength: 1,
      maxLength: 10,
    });

    it('preserves the total: sum of shares equals the input', () => {
      fc.assert(
        fc.property(safeAmount, positiveRatios, (amount, ratios) => {
          const shares = distributeFn(amount, ratios);

          expect(shares.reduce((a, b) => a + b, 0)).toBe(amount);
        })
      );
    });
    it('distributes non-negatively for positive amounts', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 100000 }),
          positiveRatios,
          (amount, ratios) => {
            const shares = distributeFn(amount, ratios);

            shares.forEach((share) => {
              expect(share).toBeGreaterThanOrEqual(0);
            });
          }
        )
      );
    });
    it('distributes non-positively for negative amounts', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: -100000, max: 0 }),
          positiveRatios,
          (amount, ratios) => {
            const shares = distributeFn(amount, ratios);

            shares.forEach((share) => {
              expect(share).toBeLessThanOrEqual(0);
            });
          }
        )
      );
    });
  });
});
