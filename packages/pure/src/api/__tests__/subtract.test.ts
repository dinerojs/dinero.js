import { USD } from '@dinero.js/currencies';
import dinero, { toSnapshot, subtract } from '../../..';

describe('subtract', () => {
  it('subtracts positive pure Dinero objects', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 100, currency: USD });

    const { amount } = toSnapshot(subtract(d1, d2));

    expect(amount).toBe(400);
  });
  it('subtracts negative pure Dinero objects', () => {
    const d1 = dinero({ amount: -500, currency: USD });
    const d2 = dinero({ amount: -100, currency: USD });

    const { amount } = toSnapshot(subtract(d1, d2));

    expect(amount).toBe(-400);
  });
});
