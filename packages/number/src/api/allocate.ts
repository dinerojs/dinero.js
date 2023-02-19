import { calculator } from '../calculator';

import { safeAllocate } from '@dinero.js/core';

/**
 * Distribute the amount of a Dinero object across a list of ratios.
 *
 * @param dineroObject - The Dinero object to allocate from.
 * @param ratios - The ratios to allocate the amount to.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export const allocate = safeAllocate(calculator);
