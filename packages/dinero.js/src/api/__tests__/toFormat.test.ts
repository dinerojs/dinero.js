import { USD } from '@dinero.js/currencies';
import Big from 'big.js';

import { toFormat } from '..';
import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createNumberDinero,
  createBigintDinero,
  createBigjsDinero,
} from '../../../../../test/utils';

describe('toFormat', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

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
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('formats the Dinero object with the passed transformer', () => {
      const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
      const d = dinero({ amount: 500n, currency: bigintUSD });

      expect(toFormat(d, formatter)).toBe('USD 5');
    });
    it('formats the Dinero object with the passed transformer using the scale', () => {
      const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
      const d = dinero({ amount: 4545n, currency: bigintUSD, scale: 3n });

      expect(toFormat(d, formatter)).toBe('USD 4.545');
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('formats the Dinero object with the passed transformer', () => {
      const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
      const d = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(toFormat(d, formatter)).toBe('USD 5');
    });
    it('formats the Dinero object with the passed transformer using the scale', () => {
      const formatter = ({ amount, currency }) => `${currency.code} ${amount}`;
      const d = dinero({
        amount: new Big(4545),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(toFormat(d, formatter)).toBe('USD 4.545');
    });
  });
});
