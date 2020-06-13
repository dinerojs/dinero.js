import { USD } from '@dinero.js/currencies';
import { Dinero, isZero } from '../../../..';

describe('isZero', () => {
  it('returns true when amount is equal to 0', () => {
    const d = Dinero({ amount: 0, currency: USD });

    expect(isZero(d)).toBe(true);
  });
  it('returns false when amount is not equal to 0', () => {
    const d = Dinero({ amount: 100, currency: USD });

    expect(isZero(d)).toBe(false);
  });
});
