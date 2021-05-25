import { USD } from '@dinero.js/currencies';

import { toSnapshot, trimScale } from '..';
import { dinero } from '../..';

describe('trimScale', () => {
  it("trims a Dinero object down to its currency exponent's scale", () => {
    const d = dinero({ amount: 500000, currency: USD, scale: 5 });
    const snapshot = toSnapshot(trimScale(d));

    expect(snapshot).toMatchObject({ amount: 500, scale: 2 });
  });
  it('trims a Dinero object down to the safest possible scale', () => {
    const d = dinero({ amount: 55550, currency: USD, scale: 4 });
    const snapshot = toSnapshot(trimScale(d));

    expect(snapshot).toMatchObject({ amount: 5555, scale: 3 });
  });
  it("doesn't trim the scale when there's nothing to trim", () => {
    const d = dinero({ amount: 5555, currency: USD, scale: 3 });
    const snapshot = toSnapshot(trimScale(d));

    expect(snapshot).toMatchObject({ amount: 5555, scale: 3 });
  });
});
