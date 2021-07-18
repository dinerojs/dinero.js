import { EUR, USD } from '@dinero.js/currencies';

import { dinero, compare } from '../../..';

describe('compare', () => {
  it('returns -1 when the first amount is less than the other', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(compare(d1, d2)).toBe(-1);
  });
  it('returns 0 when amounts are equal', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(compare(d1, d2)).toBe(0);
  });
  it('returns 1 when the first amount is greater than the other', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 500, currency: USD });

    expect(compare(d1, d2)).toBe(1);
  });
  it('normalizes the result to the highest scale', () => {
    const d1 = dinero({ amount: 5000, currency: USD, scale: 3 });
    const d2 = dinero({ amount: 800, currency: USD });

    expect(compare(d1, d2)).toBe(-1);
  });
  it('throws when using different currencies', () => {
    const d1 = dinero({ amount: 800, currency: USD });
    const d2 = dinero({ amount: 500, currency: EUR });

    expect(() => {
      compare(d1, d2);
    }).toThrowErrorMatchingInlineSnapshot(
      `"[Dinero.js] Objects must have the same currency."`
    );
  });
});
