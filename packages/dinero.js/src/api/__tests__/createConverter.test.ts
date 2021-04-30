import { EUR, IQD, USD } from '@dinero.js/currencies';

import { createConverter, dinero, toSnapshot } from '../../..';

describe('createConverter', () => {
  it('converts a Dinero object to another currency', () => {
    const convert = createConverter({
      rates: {
        EUR: {
          rate: 89,
          scale: 2,
        },
      }
    });

    const d = dinero({ amount: 500, currency: USD });

    const converted = convert(d, EUR);

    expect(toSnapshot(converted)).toEqual({
      amount: 44500,
      currency: EUR,
      scale: 4,
    });
  });
  it("uses the destination currency's exponent as scale", () => {
    const convert = createConverter({
      rates: {
        IQD: {
          rate: 1199,
        }
      }
    });

    const d = dinero({ amount: 500, currency: USD });

    const converted = convert(d, IQD);

    expect(toSnapshot(converted)).toEqual({
      amount: 5995000,
      currency: IQD,
      scale: 3,
    });
  });
});
