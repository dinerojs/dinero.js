import { calculator } from '@dinero.js/calculator-number';
import { createDinero } from '@dinero.js/core';

/**
 * Create a Dinero object.
 *
 * @param options.amount - The amount in minor currency units.
 * @param options.currency - The currency.
 * @param options.scale - The number of decimal places to represent.
 *
 * @returns The created Dinero object.
 */
export const dinero = createDinero({ calculator });
