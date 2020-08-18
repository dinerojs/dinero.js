import { maximum } from '@dinero.js/core';
import { compare } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Get the greatest of the passed pure Dinero objects.
 *
 * @param dineroObjects The pure Dinero objects to maximum.
 *
 * @returns A new pure Dinero object.
 */
const pureMaximum = maximum(dinero, { compare });

export default pureMaximum;
