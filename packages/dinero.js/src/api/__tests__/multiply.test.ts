import { USD } from '@dinero.js/currencies';
import { dinero, toSnapshot, multiply } from '../../..';

describe('multiply', () => {
  it('multiplies positive pure Dinero objects', () => {
    const d = dinero({ amount: 400, currency: USD });

    const snapshot = toSnapshot(multiply(d, 4));

    expect(snapshot).toEqual({
      amount: 1600,
      scale: 2,
      currency: USD,
    });
  });
  it('converts the multiplied amount to the safest scale', () => {
    const d = dinero({ amount: 401, currency: USD });

    const snapshot = toSnapshot(multiply(d, 2001, {
      scale: 3,
    }));

    expect(snapshot).toEqual({
      amount: 802401,
      scale: 5,
      currency: USD,
    });
  });
});
