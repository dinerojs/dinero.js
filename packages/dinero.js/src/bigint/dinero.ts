import { calculator } from '../calculator/bigint';
import { createDinero } from '../core';

/**
 * Create a Dinero object with bigint amounts.
 *
 * @param options.amount - The amount in minor currency units as a bigint.
 * @param options.currency - The currency.
 * @param options.scale - The number of decimal places to represent.
 *
 * @returns The created Dinero object.
 *
 * @public
 */
export const dinero = createDinero({
  calculator,
});
