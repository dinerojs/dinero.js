import { up } from '@dinero.js/core';
import { USD } from '@dinero.js/currencies';

import { toFormat, dinero } from '../../..';

describe('toFormat', () => {
  it('formats the Dinero object with the passed transformer', () => {
    const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
    const d = dinero({ amount: 500, currency: USD });

    expect(toFormat(d, formatter)).toBe('USD 5');
  });
  it('formats the Dinero object with the passed transformer and options', () => {
    const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
    const d = dinero({ amount: 4545, currency: USD });

    expect(
      toFormat(d, formatter, {
        digits: 1,
        round: up,
      })
    ).toBe('USD 45.5');
  });
});
