import { USD } from '@dinero.js/currencies';
import { Dinero, toSnapshot, minimum } from '../../../..';

describe('minimum', () => {
  it('returns the lower from a set of functional Dinero objects', () => {
    const d1 = Dinero({ amount: 150, currency: USD });
    const d2 = Dinero({ amount: 50, currency: USD });

    const { amount } = toSnapshot(minimum([d1, d2]));

    expect(amount).toBe(50);
  });
});
