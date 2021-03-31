import { DineroOptions, PartialDinero } from '@dinero.js/core';
import { dinero } from '../dinero';

/**
 * Create a partially applied pure Dinero object.
 *
 * @param options.currency The currency.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns The partially applied pure Dinero object.
 */
export function partialDinero<TAmount>({
  currency,
  scale,
}: Omit<DineroOptions<TAmount>, 'amount'>): PartialDinero<TAmount> {
  return (amount) => {
    return dinero({
      amount,
      currency,
      scale,
    });
  };
}
