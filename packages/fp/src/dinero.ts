import { DineroOptions } from '@dinero.js/core';
import { FunctionalDinero } from '..';

/**
 * Create a functional Dinero object.
 *
 * @param options.amount The amount in minor currency units.
 * @param options.currency The currency.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns The created functional Dinero object.
 */
function dinero<TAmountType>({
  amount,
  currency,
  scale = currency.exponent,
}: DineroOptions<TAmountType>): FunctionalDinero<TAmountType> {
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
