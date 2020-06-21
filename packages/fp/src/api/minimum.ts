import { minimum } from '@dinero.js/core';
import { minimum as minimumNumbers } from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Get the lowest of the passed functional Dinero objects.
 *
 * @param dineroObjects The functional Dinero objects to minimum.
 *
 * @returns A new functional Dinero object.
 */
const functionalMinimum = minimum(dinero, { minimum: minimumNumbers });

export default functionalMinimum;
