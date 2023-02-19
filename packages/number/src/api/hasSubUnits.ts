import { calculator } from '../calculator';

import { hasSubUnits as coreHasSubUnits } from '@dinero.js/core';

/**
 * Check whether a Dinero object has minor currency units.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object has minor currency units.
 *
 * @public
 */
export const hasSubUnits = coreHasSubUnits(calculator);
