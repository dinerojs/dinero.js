import { usd as USD } from '@dinero.js/currencies';
import Big from 'big.js';
import { castToBigintCurrency } from '../lib/es6/src/test-utils/castToBigintCurrency.js';
import { castToBigjsCurrency } from '../lib/es6/src/test-utils/castToBigjsCurrency.js';
import { createNumberDinero } from '../lib/es6/src/test-utils/createNumberDinero.js';
import { createBigintDinero } from '../lib/es6/src/test-utils/createBigintDinero.js';
import { createBigjsDinero } from '../lib/es6/src/test-utils/createBigjsDinero.js';

import { normalizeScale, toSnapshot } from '..';

describe('normalizeScale', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns an array of Dinero objects with normalized scale and converted amount', () => {
      const d1 = dinero({ amount: 100, currency: USD, scale: 2 });
      const d2 = dinero({ amount: 1000, currency: USD, scale: 3 });

      const [firstDineroObject, secondDineroObject] = normalizeScale([d1, d2]);

      expect(toSnapshot(firstDineroObject)).toEqual({
        amount: 1000,
        currency: USD,
        scale: 3,
      });
      expect(toSnapshot(secondDineroObject)).toEqual({
        amount: 1000,
        currency: USD,
        scale: 3,
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns an array of Dinero objects with normalized scale and converted amount', () => {
      const d1 = dinero({ amount: 100n, currency: bigintUSD, scale: 2n });
      const d2 = dinero({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const [firstDineroObject, secondDineroObject] = normalizeScale([d1, d2]);

      expect(toSnapshot(firstDineroObject)).toEqual({
        amount: 1000n,
        currency: bigintUSD,
        scale: 3n,
      });
      expect(toSnapshot(secondDineroObject)).toEqual({
        amount: 1000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns an array of Dinero objects with normalized scale and converted amount', () => {
      const d1 = dinero({
        amount: new Big(100),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      const d2 = dinero({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      const [firstDineroObject, secondDineroObject] = normalizeScale([d1, d2]);

      expect(toSnapshot(firstDineroObject)).toEqual({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
      expect(toSnapshot(secondDineroObject)).toEqual({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
  });
});
