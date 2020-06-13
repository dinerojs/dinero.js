import { USD } from '@dinero.js/currencies';
import { Dinero, toSnapshot, subtract } from '../../../..';

describe('subtract', () => {
  it('subtracts positive functional Dinero objects', () => {
    const d1 = Dinero({ amount: 500, currency: USD });
    const d2 = Dinero({ amount: 100, currency: USD });

    const { amount } = toSnapshot(subtract(d1, d2));

    expect(amount).toBe(400);
  });
  it('subtracts negative functional Dinero objects', () => {
    const d1 = Dinero({ amount: -500, currency: USD });
    const d2 = Dinero({ amount: -100, currency: USD });

    const { amount } = toSnapshot(subtract(d1, d2));

    expect(amount).toBe(-400);
  });
});
