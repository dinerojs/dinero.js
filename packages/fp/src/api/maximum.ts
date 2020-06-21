import { maximum } from '@dinero.js/core';
import { maximum as minimumNumbers } from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Get the greatest of the passed functional Dinero objects.
 *
 * @param dineroObjects The functional Dinero objects to maximum.
 *
 * @returns A new functional Dinero object.
 */
const functionalMaximum = maximum(dinero, { maximum: minimumNumbers });

export default functionalMaximum;
