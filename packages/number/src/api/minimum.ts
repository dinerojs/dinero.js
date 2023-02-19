import { calculator } from '../calculator';

import { safeMinimum } from '@dinero.js/core';

/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export const minimum = safeMinimum(calculator);
