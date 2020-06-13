import { USD } from '@dinero.js/currencies';
import dinero, { toSnapshot, add } from '../../../..';

describe('add', () => {
  it('adds up positive functional Dinero objects', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 100, currency: USD });

    const { amount } = toSnapshot(add(d1, d2));

    expect(amount).toBe(600);
  });
  it('adds up negative functional Dinero objects', () => {
    const d1 = dinero({ amount: -500, currency: USD });
    const d2 = dinero({ amount: -100, currency: USD });

    const { amount } = toSnapshot(add(d1, d2));

    expect(amount).toBe(-600);
  });
});
