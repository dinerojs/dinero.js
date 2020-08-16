import { isNegative } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';

/**
 * Check whether a functional Dinero object is negative.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is negative.
 */
const functionalIsNegative = isNegative({ zero, compare });

export default functionalIsNegative;
