import { USD } from '@dinero.js/currencies';
import { Dinero, isNegative } from '../../../..';

describe('isNegative', () => {
  it('returns true when amount is less than 0', () => {
    const d = Dinero({ amount: -100, currency: USD });

    expect(isNegative(d)).toBe(true);
  });
  it('returns false when amount is greater than 0', () => {
    const d = Dinero({ amount: 100, currency: USD });

    expect(isNegative(d)).toBe(false);
  });
  it('returns false when amount is equal to 0', () => {
    const d = Dinero({ amount: 0, currency: USD });

    expect(isNegative(d)).toBe(false);
  });
});
