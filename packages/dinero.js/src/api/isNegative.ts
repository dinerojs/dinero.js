import { isNegative as coreIsNegative } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';
import { createFunction } from '../helpers';

/**
 * Check whether a pure Dinero object is negative.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the pure Dinero object is negative.
 */
export const isNegative = createFunction(coreIsNegative, { zero, compare });
