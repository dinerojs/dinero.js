import { calculator } from '../calculator';

import { isPositive as coreIsPositive } from '@dinero.js/core';

/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is positive.
 *
 * @public
 */
export const isPositive = coreIsPositive(calculator);
