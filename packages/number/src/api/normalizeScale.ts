import { calculator } from '../calculator';

import { normalizeScale as coreNormalizeScale } from '@dinero.js/core';

/**
 * Normalize a set of Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects - The Dinero objects to normalize.
 *
 * @returns A new set of Dinero objects.
 *
 * @public
 */
export const normalizeScale = coreNormalizeScale(calculator);
