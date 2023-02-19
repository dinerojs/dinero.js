import { calculator } from '../calculator';

import { safeMaximum } from '@dinero.js/core';

/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export const maximum = safeMaximum(calculator);
