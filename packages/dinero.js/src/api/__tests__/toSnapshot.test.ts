import { USD } from '@dinero.js/currencies';

import { dinero, toSnapshot } from '../../..';

describe('toSnapshot', () => {
  it('returns an object literal with the right data', () => {
    const d = dinero({ amount: 500, currency: USD });

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
