import { maximum as coreMaximum } from '@dinero.js/core';
import { compare } from '@dinero.js/core/calculator';
import { buildMethod } from '../buildMethod';

/**
 * Get the greatest of the passed pure Dinero objects.
 *
 * @param dineroObjects The pure Dinero objects to maximum.
 *
 * @returns A new pure Dinero object.
 */
export const maximum = buildMethod(coreMaximum, { compare });
