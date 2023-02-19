import { calculator } from '../calculator';

import { multiply as coreMultiply } from '@dinero.js/core';

/**
 * Multiply the passed Dinero object.
 *
 * @param multiplicand - The Dinero object to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export const multiply = coreMultiply(calculator);
