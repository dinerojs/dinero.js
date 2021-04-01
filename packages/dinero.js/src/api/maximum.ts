import { createMaximum } from '@dinero.js/core';
import { compare } from '@dinero.js/calculator/number';

/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 */
export const maximum = createMaximum({ compare });
