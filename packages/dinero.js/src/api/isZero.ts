import { createIsZero } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/calculator/number';

/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 */
export const isZero = createIsZero({ zero, compare });
