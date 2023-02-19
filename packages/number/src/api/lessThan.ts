import { calculator } from '../calculator';

import { safeLessThan } from '@dinero.js/core';

/**
 * Check whether the value of a Dinero object is lesser than another.
 *
 * @param dineroObject - The Dinero object to compare.
 * @param comparator - The Dinero object to compare to.
 *
 * @returns Whether the Dinero to compare is lesser than the other.
 *
 * @public
 */
export const lessThan = safeLessThan(calculator);
