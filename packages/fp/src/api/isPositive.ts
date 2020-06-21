import { isPositive } from '@dinero.js/core';
import { greaterThanOrEqual, zero } from '@dinero.js/core/calculator/number';

/**
 * Check whether a functional Dinero object is positive.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object is positive.
 */
const functionalIsPositive = isPositive({ zero, greaterThanOrEqual });

export default functionalIsPositive;
