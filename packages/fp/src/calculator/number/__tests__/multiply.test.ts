import { USD } from '@dinero.js/currencies';
import { Dinero, toSnapshot, multiply } from '../../../..';

describe('multiply', () => {
  it('multiplies positive functional Dinero objects', () => {
    const d = Dinero({ amount: 400, currency: USD });

    const { amount } = toSnapshot(multiply(d, 4));

    expect(amount).toBe(1600);
  });
  it('rounds down the multiplied amount', () => {
    const d = Dinero({ amount: 400, currency: USD });

    const { amount } = toSnapshot(multiply(d, 2.001));

    expect(amount).toBe(800);
  });
  it('rounds up the multiplied amount', () => {
    const d = Dinero({ amount: 400, currency: USD });

    const { amount } = toSnapshot(multiply(d, 2.002));

    expect(amount).toBe(801);
  });
});
