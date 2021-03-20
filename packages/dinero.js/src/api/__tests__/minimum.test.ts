import { USD } from '@dinero.js/currencies';
import { dinero, toSnapshot, minimum } from '../../..';

describe('minimum', () => {
  it('returns the lower from a set of pure Dinero objects', () => {
    const d1 = dinero({ amount: 150, currency: USD });
    const d2 = dinero({ amount: 50, currency: USD });

    const { amount } = toSnapshot(minimum([d1, d2]));

    expect(amount).toBe(50);
  });
});
