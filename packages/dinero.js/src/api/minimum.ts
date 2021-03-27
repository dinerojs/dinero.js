import { minimum as coreMinimum } from '@dinero.js/core';
import { compare } from '@dinero.js/calculator/number';
import { createFunction } from '../helpers';

/**
 * Get the lowest of the passed pure Dinero objects.
 *
 * @param dineroObjects The pure Dinero objects to minimum.
 *
 * @returns A new pure Dinero object.
 */
export const minimum = createFunction(coreMinimum, { compare });
