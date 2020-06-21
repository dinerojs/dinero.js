import { USD } from '@dinero.js/currencies';
import dinero, { toSnapshot, maximum } from '../../..';

describe('maximum', () => {
  it('returns the greatest from a set of functional Dinero objects', () => {
    const d1 = dinero({ amount: 150, currency: USD });
    const d2 = dinero({ amount: 50, currency: USD });

    const { amount } = toSnapshot(maximum([d1, d2]));

    expect(amount).toBe(150);
  });
});
