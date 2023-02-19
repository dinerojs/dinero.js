import { calculator } from '../calculator';

import { isZero as coreIsZero } from '@dinero.js/core';

/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 *
 * @public
 */
export const isZero = coreIsZero(calculator);
