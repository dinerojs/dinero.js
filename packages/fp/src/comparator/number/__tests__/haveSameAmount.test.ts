import { USD } from '@dinero.js/currencies';
import { Dinero, haveSameAmount } from '../../../..';

describe('haveSameAmount', () => {
  it('returns true when amounts are equal', () => {
    const d1 = Dinero({ amount: 1000, currency: USD });
    const d2 = Dinero({ amount: 1000, currency: USD });

    expect(haveSameAmount([d1, d2])).toBe(true);
  });
  it('returns false when amounts are not equal', () => {
    const d1 = Dinero({ amount: 1000, currency: USD });
    const d2 = Dinero({ amount: 2000, currency: USD });

    expect(haveSameAmount([d1, d2])).toBe(false);
  });
  it('returns true when amounts are equal once normalized', () => {
    const d1 = Dinero({ amount: 1000, currency: USD });
    const d2 = Dinero({ amount: 10000, currency: USD, scale: 3 });

    expect(haveSameAmount([d1, d2])).toBe(true);
  });
  it('returns false when amounts are not equal once normalized', () => {
    const d1 = Dinero({ amount: 10000, currency: USD });
    const d2 = Dinero({ amount: 10000, currency: USD, scale: 3 });

    expect(haveSameAmount([d1, d2])).toBe(false);
  });
});
