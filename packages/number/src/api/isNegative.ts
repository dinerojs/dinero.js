import { calculator } from '../calculator';

import { isNegative as coreIsNegative } from '@dinero.js/core';

/**
 * Check whether a Dinero object is negative.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is negative.
 *
 * @public
 */
export const isNegative = coreIsNegative(calculator);
