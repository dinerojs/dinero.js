import { calculator } from '../calculator';

import { safeGreaterThanOrEqual } from '@dinero.js/core';

/**
 * Check whether the value of a Dinero object is greater than or equal another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than or equal the other.
 *
 * @public
 */
export const greaterThanOrEqual = safeGreaterThanOrEqual(calculator);
