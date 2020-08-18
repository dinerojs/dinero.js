import { USD } from '@dinero.js/currencies';
import dinero, { toSnapshot, percentage } from '../../..';

describe('percentage', () => {
  it('returns a percentage of a pure Dinero object', () => {
    const d = dinero({ amount: 10000, currency: USD });

    const { amount } = toSnapshot(percentage(d, 50));

    expect(amount).toBe(5000);
  });
});
