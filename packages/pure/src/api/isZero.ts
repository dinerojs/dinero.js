import { isZero as coreIsZero } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';

/**
 * Check whether the value of a pure Dinero object is zero.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the value of a pure Dinero object is zero.
 */
export const isZero = buildMethod(coreIsZero, { zero, compare });
