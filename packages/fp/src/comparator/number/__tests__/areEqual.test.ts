import { USD, EUR } from '@dinero.js/currencies';
import dinero, { areEqual } from '../../../..';

describe('areEqual', () => {
  it('returns true when amounts and currencies are equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(areEqual([d1, d2])).toBe(true);
  });
  it('returns false when amounts are not equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(areEqual([d1, d2])).toBe(false);
  });
  it('returns false when currencies are not equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: EUR });

    expect(areEqual([d1, d2])).toBe(false);
  });
  it('returns false when amounts and currencies are not equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: EUR });

    expect(areEqual([d1, d2])).toBe(false);
  });
});
