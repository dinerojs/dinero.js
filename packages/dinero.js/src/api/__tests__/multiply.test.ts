import { USD } from '@dinero.js/currencies';
import { dinero, toSnapshot, multiply } from '../../..';

describe('multiply', () => {
  it('multiplies positive pure Dinero objects', () => {
    const d = dinero({ amount: 400, currency: USD });

    const { amount } = toSnapshot(multiply(d, 4));

    expect(amount).toBe(1600);
  });
  it('converts the multiplied amount to the highest scale', () => {
    const d = dinero({ amount: 400, currency: USD });

    const multiplied = multiply(d, 2001, {
      scale: 3,
    });

    expect(toSnapshot(multiplied)).toEqual({
      amount: 8004,
      scale: 3,
      currency: USD,
    });
  });
});
