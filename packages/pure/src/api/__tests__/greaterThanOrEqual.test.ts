import { USD } from '@dinero.js/currencies';
import dinero, { greaterThanOrEqual } from '../../..';

describe('greaterThanOrEqual', () => {
  it('returns false when the first amount is less than the other', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(greaterThanOrEqual(d1, d2)).toBe(false);
  });
  it('returns true when amounts are equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(greaterThanOrEqual(d1, d2)).toBe(true);
  });
  it('returns true when the first amount is greater than the other', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(greaterThanOrEqual(d1, d2)).toBe(true);
  });
});
