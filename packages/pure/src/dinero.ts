import { DineroOptions } from '@dinero.js/core';
import { PureDinero } from '..';

/**
 * Create a pure Dinero object.
 *
 * @param options.amount The amount in minor currency units.
 * @param options.currency The currency.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns The created pure Dinero object.
 */
function dinero<TAmount>({
  amount,
  currency,
  scale = currency.exponent,
}: DineroOptions<TAmount>): PureDinero<TAmount> {
  return {
    toJSON() {
      return {
        amount,
        currency,
        scale,
      };
    },
  };
}

export default dinero;
