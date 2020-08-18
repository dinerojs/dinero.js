import { USD } from '@dinero.js/currencies';
import dinero, { toSnapshot, divide } from '../../..';

describe('divide', () => {
  it('divides positive pure Dinero objects', () => {
    const d = dinero({ amount: 400, currency: USD });
    const { amount } = toSnapshot(divide(d, 4));

    expect(amount).toBe(100);
  });
  it('rounds up the divided amount', () => {
    const d = dinero({ amount: 400, currency: USD });
    const { amount } = toSnapshot(divide(d, 3));

    expect(amount).toBe(133);
  });
  it('rounds down the divided amount', () => {
    const d = dinero({ amount: 400, currency: USD });
    const { amount } = toSnapshot(divide(d, 6));

    expect(amount).toBe(67);
  });
  it('rounds the divided amount to the nearest even number', () => {
    const d = dinero({ amount: 105, currency: USD });
    const { amount } = toSnapshot(divide(d, 2));

    expect(amount).toBe(52);
  });
});
