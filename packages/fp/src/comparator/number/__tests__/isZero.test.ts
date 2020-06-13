import { USD } from '@dinero.js/currencies';
import dinero, { isZero } from '../../../..';

describe('isZero', () => {
  it('returns true when amount is equal to 0', () => {
    const d = dinero({ amount: 0, currency: USD });

    expect(isZero(d)).toBe(true);
  });
  it('returns false when amount is not equal to 0', () => {
    const d = dinero({ amount: 100, currency: USD });

    expect(isZero(d)).toBe(false);
  });
});
