import { toUnit as coreToUnit } from '@dinero.js/core';
import { divide, power } from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';

/**
 * Get the amount of a pure Dinero object in units.
 *
 * @param dineroObject The pure Dinero object to transform.
 *
 * @returns The amount in units.
 */
export const toUnit = buildMethod(coreToUnit, { divide, power });
