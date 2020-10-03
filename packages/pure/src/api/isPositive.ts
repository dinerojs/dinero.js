import { isPositive as coreIsPositive } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';
import { buildMethod } from '../buildMethod';

/**
 * Check whether a pure Dinero object is positive.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the pure Dinero object is positive.
 */
export const isPositive = buildMethod(coreIsPositive, { zero, compare });
