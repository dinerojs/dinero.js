import { USD } from '@dinero.js/currencies';
import { Dinero, toSnapshot, percentage } from '../../../..';

describe('percentage', () => {
  it('returns a percentage of a functional Dinero object', () => {
    const d = Dinero({ amount: 10000, currency: USD });

    const { amount } = toSnapshot(percentage(d, 50));

    expect(amount).toBe(5000);
  });
});
