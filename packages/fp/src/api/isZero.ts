import { isZero } from '@dinero.js/core';
import { equal, zero } from '@dinero.js/core/calculator/number';

/**
 * Check whether the value of a functional Dinero object is zero.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the value of a functional Dinero object is zero.
 */
const functionalIsZero = isZero({ zero, equal });

export default functionalIsZero;
