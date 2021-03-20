import { USD, EUR, IQD } from '@dinero.js/currencies';
import { dinero, toSnapshot, convert } from '../../..';
import { halfEven as roundingMode } from '@dinero.js/core/calculator';

describe('convert', () => {
  it('converts a pure Dinero object to another currency', async () => {
    const d = dinero({ amount: 500, currency: USD });

    const converted = await convert(d, EUR, {
      rates: Promise.resolve({
        EUR: 0.89,
      }),
      roundingMode,
    });

    expect(toSnapshot(converted)).toEqual({
      amount: 445,
      currency: EUR,
      scale: 2,
    });
  });
  it("preserves the source object's scale", async () => {
    const d = dinero({ amount: 500, currency: USD });

    const converted = await convert(d, IQD, {
      rates: Promise.resolve({
        IQD: 1199.08,
      }),
      roundingMode,
    });

    expect(toSnapshot(converted)).toEqual({
      amount: 599540,
      currency: IQD,
      scale: 2,
    });
  });
  it("uses the destination currency's exponent as scale", async () => {
    const d = dinero({ amount: 500, currency: USD });

    const converted = await convert(d, IQD, {
      rates: Promise.resolve({
        IQD: 11990.8,
      }),
      roundingMode,
      preserveScale: false,
    });

    expect(toSnapshot(converted)).toEqual({
      amount: 5995400,
      currency: IQD,
      scale: 3,
    });
  });
});
