import { USD } from '@dinero.js/currencies';
import { Dinero, toSnapshot } from '../../..';

describe('toSnapshot', () => {
  it('returns an object literal with the right data', () => {
    const d = Dinero({ amount: 500, currency: USD });

    expect(toSnapshot(d)).toEqual({
      amount: 500,
      currency: {
        code: 'USD',
        base: 10,
        exponent: 2,
      },
      scale: 2,
    });
  });
});
