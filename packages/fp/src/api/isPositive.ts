import { isPositive } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';

/**
 * Check whether a functional Dinero object is positive.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is positive.
 */
const functionalIsPositive = isPositive({ zero, compare });

export default functionalIsPositive;
