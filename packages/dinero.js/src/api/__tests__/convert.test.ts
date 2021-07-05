import { EUR, IQD, USD } from '@dinero.js/currencies';

import { convert, dinero, toSnapshot } from '../../..';

describe('convert', () => {
  it('converts a Dinero object to another currency', () => {
    const d = dinero({ amount: 500, currency: USD });

    const converted = convert(d, EUR, {
      EUR: {
        amount: 89,
        scale: 2,
      },
    });

    expect(toSnapshot(converted)).toEqual({
      amount: 44500,
      currency: EUR,
      scale: 4,
    });
  });
  it("uses the destination currency's exponent as scale", () => {
    const d = dinero({ amount: 500, currency: USD });

    const converted = convert(d, IQD, {
      IQD: 1199,
    });

    expect(toSnapshot(converted)).toEqual({
      amount: 5995000,
      currency: IQD,
      scale: 3,
    });
  });
});
