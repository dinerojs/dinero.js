import { USD, EUR } from '@dinero.js/currencies';
import { Dinero, haveSameCurrency } from '../../../..';

describe('haveSameCurrency', () => {
  it('returns true when currencies are equal', () => {
    const d1 = Dinero({ amount: 2000, currency: USD });
    const d2 = Dinero({ amount: 1000, currency: USD });

    expect(haveSameCurrency([d1, d2])).toBe(true);
  });
  it('returns false when currencies are not equal', () => {
    const d1 = Dinero({ amount: 1000, currency: USD });
    const d2 = Dinero({ amount: 1000, currency: EUR });

    expect(haveSameCurrency([d1, d2])).toBe(false);
  });
});
