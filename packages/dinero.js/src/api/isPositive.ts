import { createIsPositive } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/calculator/number';

/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the Dinero object is positive.
 */
export const isPositive = createIsPositive({ zero, compare });
