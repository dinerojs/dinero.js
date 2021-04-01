import { createToUnit } from '@dinero.js/core';
import { divide, power } from '@dinero.js/calculator/number';

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject The Dinero object to transform.
 *
 * @returns The amount in units.
 */
export const toUnit = createToUnit({ divide, power });
