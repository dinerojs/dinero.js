import { allocate } from '@dinero.js/core';
import { distribute } from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Distribute the amount of a functional Dinero object across a list of ratios.
 *
 * @param dineroObject The functional Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new functional Dinero object.
 */
const functionalAllocate = allocate(dinero, { distribute });

export default functionalAllocate;
