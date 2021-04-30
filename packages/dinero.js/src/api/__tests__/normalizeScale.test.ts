import { USD } from '@dinero.js/currencies';

import { dinero, normalizeScale, toSnapshot } from '../../..';

describe('normalizeScale', () => {
  it('returns an array of Dinero objects with normalized scale and converted amount', () => {
    const d1 = dinero({ amount: 100, currency: USD, scale: 2 });
    const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

    const [firstDineroObject, secondDineroObject] = normalizeScale([d1, d2]);

    expect(toSnapshot(firstDineroObject)).toEqual({
      amount: 1000,
      currency: USD,
      scale: 3,
    });
    expect(toSnapshot(secondDineroObject)).toEqual({
      amount: 1000,
      currency: USD,
      scale: 3,
    });
  });
});
