import { USD } from '@dinero.js/currencies';

import { toSnapshot, dinero } from '..';

describe('dinero', () => {
  it('creates a Dinero object', () => {
    const d = dinero({ amount: 50000, currency: USD, scale: 4 });

    const snapshot = toSnapshot(d);

    expect(snapshot).toMatchObject({ amount: 50000, currency: USD, scale: 4 });
  });
  it("uses the currency's exponent as scale when not provided", () => {
    const d = dinero({ amount: 500, currency: USD });

    const snapshot = toSnapshot(d);

    expect(snapshot).toMatchObject({ amount: 500, currency: USD, scale: 2 });
  });
});
