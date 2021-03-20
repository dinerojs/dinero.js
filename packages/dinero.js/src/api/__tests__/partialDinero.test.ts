import { USD } from '@dinero.js/currencies';
import { toSnapshot } from '../..';
import { partialDinero } from '../partialDinero';

describe('partialDinero', () => {
  it('partially applies a pure Dinero object with a currency', () => {
    const dineroUSD = partialDinero({ currency: USD });
    const d = dineroUSD(500);

    const snapshot = toSnapshot(d);

    expect(snapshot).toMatchObject({
      amount: 500,
      currency: USD,
      scale: 2,
    });
  });
  it('partially applies a pure Dinero object with a currency and scale', () => {
    const dineroUSD = partialDinero({ currency: USD, scale: 4 });
    const d = dineroUSD(50000);

    const snapshot = toSnapshot(d);

    expect(snapshot).toMatchObject({
      amount: 50000,
      currency: USD,
      scale: 4,
    });
  });
});
