import { EUR, USD } from '@dinero.js/currencies';

import { dinero, haveSameCurrency } from '../../..';

describe('haveSameCurrency', () => {
  it('returns true when currencies are equal', () => {
    const d1 = dinero({ amount: 2000, currency: USD });
    const d2 = dinero({ amount: 1000, currency: USD });

    expect(haveSameCurrency([d1, d2])).toBe(true);
  });
  it('returns false when currencies are not equal', () => {
    const d1 = dinero({ amount: 1000, currency: USD });
    const d2 = dinero({ amount: 1000, currency: EUR });

    expect(haveSameCurrency([d1, d2])).toBe(false);
  });
  it('returns true when currencies are structurally equal', () => {
    const d1 = dinero({
      amount: 2000,
      currency: {
        code: 'USD',
        base: 10,
        exponent: 2,
      }
    });
    const d2 = dinero({
      amount: 1000,
      currency: {
        code: 'USD',
        base: 10,
        exponent: 2,
      }
    });

    expect(haveSameCurrency([d1, d2])).toBe(true);
  });
});
