import { isZero } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';

/**
 * Check whether the value of a functional Dinero object is zero.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the value of a functional Dinero object is zero.
 */
const functionalIsZero = isZero({ zero, compare });

export default functionalIsZero;
