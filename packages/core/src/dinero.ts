import { Dinero, DineroOptions } from '@dinero.js/core';

/**
 * Create a Dinero object.
 *
 * @param options.amount The amount in minor currency units.
 * @param options.currency The currency.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns The created Dinero object.
 */
export function dinero<TAmount>({
  amount,
  currency,
  scale = currency.exponent,
}: DineroOptions<TAmount>): Dinero<TAmount> {
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
