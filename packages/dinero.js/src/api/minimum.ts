import { createMinimum } from '@dinero.js/core';
import { compare } from '@dinero.js/calculator/number';

/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 */
export const minimum = createMinimum({ compare });
