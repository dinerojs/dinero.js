import { EUR, USD } from '@dinero.js/currencies';

import { dinero, greaterThan } from '../../..';

describe('greaterThan', () => {
  it('returns false when the first amount is less than the other', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(greaterThan(d1, d2)).toBe(false);
  });
  it('returns false when amounts are equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(greaterThan(d1, d2)).toBe(false);
  });
  it('returns true when the first amount is greater than the other', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(greaterThan(d1, d2)).toBe(true);
  });
  it('normalizes the result to the highest scale', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 5000, currency: USD, scale: 3 });

    expect(greaterThan(d1, d2)).toBe(true);
  });
  it('throws when using different currencies', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 500, currency: EUR });

    expect(() => {
      greaterThan(d1, d2);
    }).toThrowErrorMatchingInlineSnapshot(
      `"[Dinero.js] Objects must have the same currency."`
    );
  });
});
