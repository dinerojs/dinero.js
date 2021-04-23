import { USD, EUR } from '@dinero.js/currencies';
import { dinero, toSnapshot, minimum } from '../../..';

describe('minimum', () => {
  it('returns the lower from a set of pure Dinero objects', () => {
    const d1 = dinero({ amount: 150, currency: USD });
    const d2 = dinero({ amount: 50, currency: USD });

    const snapshot = toSnapshot(minimum([d1, d2]));

    expect(snapshot).toEqual({
      amount: 50,
      currency: USD,
      scale: 2,
    });
  });
  it('returns the greatest from a set of Dinero objects after normalization', () => {
    const d1 = dinero({ amount: 500, currency: USD });
    const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

    const snapshot = toSnapshot(minimum([d1, d2]));

    expect(snapshot).toEqual({
      amount: 1000,
      currency: USD,
      scale: 3,
    });
  });
  it('throws when using different currencies', () => {
    const d1 = dinero({ amount: 150, currency: USD });
    const d2 = dinero({ amount: 50, currency: EUR });

    expect(() => {
      minimum([d1, d2]);
    }).toThrowErrorMatchingInlineSnapshot(
      `"Dinero objects don't have the same currency."`
    );
  });
});
