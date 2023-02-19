import { calculator } from '../calculator';

import { safeGreaterThan } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is greater than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is greater than the other.
 *
 * @public
 */
export const greaterThan = safeGreaterThan(calculator);
