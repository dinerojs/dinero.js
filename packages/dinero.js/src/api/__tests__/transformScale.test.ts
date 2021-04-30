import { USD } from '@dinero.js/currencies';

import { dinero, toSnapshot, transformScale } from '../../..';

describe('transformScale', () => {
  it('returns a new Dinero object with a new scale and a converted amount', () => {
    const d = dinero({ amount: 500, currency: USD, scale: 2 });
    const snapshot = toSnapshot(transformScale(d, 4));

    expect(snapshot).toMatchObject({ amount: 50000, scale: 4 });
  });
  it('returns a new Dinero object with a new scale and a converted, rounded down amount', () => {
    const d = dinero({ amount: 14270, currency: USD, scale: 2 });
    const snapshot = toSnapshot(transformScale(d, 0));

    expect(snapshot).toMatchObject({ amount: 142, scale: 0 });
  });
  it('converts between scales correctly', () => {
    const d = dinero({ amount: 333336, currency: USD, scale: 5 });
    const snapshot = toSnapshot(transformScale(d, 2));

    expect(snapshot).toMatchObject({ amount: 333, scale: 2 });
  });
  it('converts from long initial scales correctly', () => {
    const d = dinero({ amount: 3333333336, currency: USD, scale: 9 });
    const snapshot = toSnapshot(transformScale(d, 2));

    expect(snapshot).toMatchObject({ amount: 333, scale: 2 });
  });
});
