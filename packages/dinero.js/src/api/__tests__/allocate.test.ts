import { Dinero } from '@dinero.js/core';
import { USD } from '@dinero.js/currencies';
import { dinero, toSnapshot, allocate } from '../../..';

describe('allocate', () => {
  it('allocates to percentages', () => {
    const d = dinero({ amount: 1003, currency: USD });
    const shares = allocate(d, [50, 50]);
    const amounts = getAmounts(shares);

    expect(amounts).toEqual([502, 501]);
  });
  it('allocates to ratios', () => {
    const d = dinero({ amount: 100, currency: USD });
    const shares = allocate(d, [1, 3]);
    const amounts = getAmounts(shares);

    expect(amounts).toEqual([25, 75]);
  });
  it('ignores zero ratios', () => {
    const d = dinero({ amount: 1003, currency: USD });
    const shares = allocate(d, [0, 50, 50]);
    const amounts = getAmounts(shares);

    expect(amounts).toEqual([0, 502, 501]);
  });
});

function getAmounts(shares: ReadonlyArray<Dinero<number>>) {
  return shares.map((share) => {
    const { amount } = toSnapshot(share);

    return amount;
  });
}
