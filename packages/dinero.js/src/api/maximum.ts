import { maximum as coreMaximum } from '@dinero.js/core';
import { compare } from '@dinero.js/calculator/number';
import { createFunction } from '../helpers';

/**
 * Get the greatest of the passed pure Dinero objects.
 *
 * @param dineroObjects The pure Dinero objects to maximum.
 *
 * @returns A new pure Dinero object.
 */
export const maximum = createFunction(coreMaximum, { compare });
