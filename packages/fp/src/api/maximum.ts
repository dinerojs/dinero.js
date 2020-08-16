import { maximum } from '@dinero.js/core';
import { compare } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Get the greatest of the passed functional Dinero objects.
 *
 * @param dineroObjects The functional Dinero objects to maximum.
 *
 * @returns A new functional Dinero object.
 */
const functionalMaximum = maximum(dinero, { compare });

export default functionalMaximum;
