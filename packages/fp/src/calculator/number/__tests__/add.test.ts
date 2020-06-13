import { USD } from '@dinero.js/currencies';
import { Dinero, toSnapshot, add } from '../../../..';

describe('add', () => {
  it('adds up positive functional Dinero objects', () => {
    const d1 = Dinero({ amount: 500, currency: USD });
    const d2 = Dinero({ amount: 100, currency: USD });

    const { amount } = toSnapshot(add(d1, d2));

    expect(amount).toBe(600);
  });
  it('adds up negative functional Dinero objects', () => {
    const d1 = Dinero({ amount: -500, currency: USD });
    const d2 = Dinero({ amount: -100, currency: USD });

    const { amount } = toSnapshot(add(d1, d2));

    expect(amount).toBe(-600);
  });
});
