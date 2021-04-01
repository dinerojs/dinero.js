import { createIsNegative } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/calculator/number';

/**
 * Check whether a Dinero object is negative.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the Dinero object is negative.
 */
export const isNegative = createIsNegative({ zero, compare });
