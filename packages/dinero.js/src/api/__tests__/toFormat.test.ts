import { USD } from '@dinero.js/currencies';

import { toFormat, dinero } from '../../..';

describe('toFormat', () => {
  it('formats the Dinero object with the passed transformer', () => {
    const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
    const d = dinero({ amount: 500, currency: USD });

    expect(toFormat(d, formatter)).toBe('USD 5');
  });
  it('formats the Dinero object with the passed transformer using the scale', () => {
    const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
    const d = dinero({ amount: 4545, currency: USD, scale: 3 });

    expect(toFormat(d, formatter)).toBe('USD 4.545');
  });
});
