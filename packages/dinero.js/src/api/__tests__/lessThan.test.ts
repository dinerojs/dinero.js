import { EUR, USD } from '@dinero.js/currencies';

import { dinero, lessThan } from '../../..';

describe('lessThan', () => {
  it('returns true when the first amount is less than the other', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(lessThan(d1, d2)).toBe(true);
  });
  it('returns false when amounts are equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(lessThan(d1, d2)).toBe(false);
  });
  it('returns false when the first amount is greater than the other', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(lessThan(d1, d2)).toBe(false);
  });
  it('normalizes the result to the highest scale', () => {
    const d1 = dinero({ amount: 5000, currency: USD, scale: 3 });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(lessThan(d1, d2)).toBe(true);
  });
  it('throws when using different currencies', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 500, currency: EUR });

    expect(() => {
      lessThan(d1, d2);
    }).toThrowErrorMatchingInlineSnapshot(
      `"[Dinero.js] Dinero objects don't have the same currency."`
    );
  });
});
