import { USD } from '@dinero.js/currencies';
import dinero, { isPositive } from '../../../..';

describe('isPositive', () => {
  it('returns false when amount is less than 0', () => {
    const d = dinero({ amount: -100, currency: USD });

    expect(isPositive(d)).toBe(false);
  });
  it('returns true when amount is greater than 0', () => {
    const d = dinero({ amount: 100, currency: USD });

    expect(isPositive(d)).toBe(true);
  });
  it('returns true when amount is equal to 0', () => {
    const d = dinero({ amount: 0, currency: USD });

    expect(isPositive(d)).toBe(true);
  });
});
