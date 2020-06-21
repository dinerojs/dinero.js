import { isNegative } from '@dinero.js/core';
import { lessThan, zero } from '@dinero.js/core/calculator/number';

/**
 * Check whether a functional Dinero object is negative.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is negative.
 */
const functionalIsNegative = isNegative({ zero, lessThan });

export default functionalIsNegative;
