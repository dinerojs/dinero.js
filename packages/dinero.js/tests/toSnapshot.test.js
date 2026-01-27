import { usd as USD } from '@dinero.js/currencies';
import Big from 'big.js';
import { castToBigintCurrency } from '../lib/es6/src/test-utils/castToBigintCurrency.js';
import { castToBigjsCurrency } from '../lib/es6/src/test-utils/castToBigjsCurrency.js';
import { createNumberDinero } from '../lib/es6/src/test-utils/createNumberDinero.js';
import { createBigintDinero } from '../lib/es6/src/test-utils/createBigintDinero.js';
import { createBigjsDinero } from '../lib/es6/src/test-utils/createBigjsDinero.js';

import { toSnapshot } from '..';

describe('toSnapshot', () => {
  describe('number', () => {
    const dinero = createNumberDinero;

    it('returns an object literal with the right data', () => {
      const d = dinero({ amount: 500, currency: USD });

      expect(toSnapshot(d)).toEqual({
        amount: 500,
        currency: {
          code: 'USD',
          base: 10,
          exponent: 2,
        },
        scale: 2,
      });
    });
  });
  describe('bigint', () => {
    const dinero = createBigintDinero;
    const bigintUSD = castToBigintCurrency(USD);

    it('returns an object literal with the right data', () => {
      const d = dinero({ amount: 500n, currency: bigintUSD });

      expect(toSnapshot(d)).toEqual({
        amount: 500n,
        currency: {
          code: 'USD',
          base: 10n,
          exponent: 2n,
        },
        scale: 2n,
      });
    });
  });
  describe('Big.js', () => {
    const dinero = createBigjsDinero;
    const bigjsUSD = castToBigjsCurrency(USD);

    it('returns an object literal with the right data', () => {
      const d = dinero({ amount: new Big(500), currency: bigjsUSD });

      expect(toSnapshot(d)).toEqual({
        amount: new Big(500),
        currency: {
          code: 'USD',
          base: new Big(10),
          exponent: new Big(2),
        },
        scale: new Big(2),
      });
    });
  });
});
