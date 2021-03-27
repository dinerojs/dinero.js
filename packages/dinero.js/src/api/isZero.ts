import { isZero as coreIsZero } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/calculator/number';
import { createFunction } from '../helpers';

/**
 * Check whether the value of a pure Dinero object is zero.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the value of a pure Dinero object is zero.
 */
export const isZero = createFunction(coreIsZero, { zero, compare });
