import { USD } from '@dinero.js/currencies';

import { dinero, toUnit } from '../../..';

describe('toUnit', () => {
  it('returns the amount in currency unit', () => {
    const d = dinero({ amount: 1050, currency: USD });

    expect(toUnit(d)).toBe(10.5);
  });
  it('returns the amount in currency unit, based on a custom scale', () => {
    const d = dinero({ amount: 10545, currency: USD, scale: 3 });

    expect(toUnit(d)).toBe(10.545);
  });
});
