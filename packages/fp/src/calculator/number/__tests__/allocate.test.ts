import { USD } from '@dinero.js/currencies';
import { Dinero, toSnapshot, allocate } from '../../../..';

describe('allocate', () => {
  it('allocates to percentages', () => {
    const d = Dinero({ amount: 1003, currency: USD });
    const shares = allocate(d, [50, 50]);
    const amounts = shares.map((share) => {
      const { amount } = toSnapshot(share);

      return amount;
    });

    expect(amounts).toEqual([502, 501]);
  });
  it('allocates to ratios', () => {
    const d = Dinero({ amount: 100, currency: USD });
    const shares = allocate(d, [1, 3]);
    const amounts = shares.map((share) => {
      const { amount } = toSnapshot(share);

      return amount;
    });

    expect(amounts).toEqual([25, 75]);
  });
  it('ignores zero ratios', () => {
    const d = Dinero({ amount: 1003, currency: USD });
    const shares = allocate(d, [0, 50, 50]);
    const amounts = shares.map((share) => {
      const { amount } = toSnapshot(share);

      return amount;
    });

    expect(amounts).toEqual([0, 502, 501]);
  });
});
