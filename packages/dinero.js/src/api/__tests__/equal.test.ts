import { EUR, USD } from '@dinero.js/currencies';

import { dinero, equal } from '../../..';

describe('equal', () => {
  it('returns true when amounts and currencies are equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(equal(d1, d2)).toBe(true);
  });
  it('returns false when amounts are not equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(equal(d1, d2)).toBe(false);
  });
  it('returns false when currencies are not equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: EUR });

    expect(equal(d1, d2)).toBe(false);
  });
  it('returns false when amounts and currencies are not equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: EUR });

    expect(equal(d1, d2)).toBe(false);
  });
  it('returns true when amounts are equal after normalization', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 5000, currency: USD, scale: 3 });

    expect(equal(d1, d2)).toBe(true);
  });
  it('returns false when amounts are not equal after normalization', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD, scale: 3 });

    expect(equal(d1, d2)).toBe(false);
  });
});
