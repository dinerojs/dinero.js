import { DineroOptions } from '@dinero.js/core';
import { PartialFunctionalDinero } from '../..';
import dinero from '../dinero';

/**
 * Create a partially applied functional Dinero object.
 *
 * @param options.currency The currency.
 * @param options.scale The number of decimal places to represent.
 *
 * @returns The partially applied functional Dinero object.
 */
function partialDinero<TType>({
  currency,
  scale,
}: Omit<DineroOptions<TType>, 'amount'>): PartialFunctionalDinero<TType> {
  return (amount) => {
    return dinero({
      amount,
      currency,
      scale,
    });
  };
}

export default partialDinero;
