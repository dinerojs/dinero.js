import { isPositive as coreIsPositive } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';
import { createFunction } from '../helpers';

/**
 * Check whether a pure Dinero object is positive.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the pure Dinero object is positive.
 */
export const isPositive = createFunction(coreIsPositive, { zero, compare });
