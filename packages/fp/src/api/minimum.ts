import { minimum } from '@dinero.js/core';
import { compare } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Get the lowest of the passed functional Dinero objects.
 *
 * @param dineroObjects The functional Dinero objects to minimum.
 *
 * @returns A new functional Dinero object.
 */
const functionalMinimum = minimum(dinero, { compare });

export default functionalMinimum;
