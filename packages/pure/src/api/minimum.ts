import { minimum } from '@dinero.js/core';
import { compare } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Get the lowest of the passed pure Dinero objects.
 *
 * @param dineroObjects The pure Dinero objects to minimum.
 *
 * @returns A new pure Dinero object.
 */
const pureMinimum = minimum(dinero, { compare });

export default pureMinimum;
