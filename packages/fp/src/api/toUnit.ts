import { toUnit } from '@dinero.js/core';
import { divide, power } from '@dinero.js/core/calculator/number';

/**
 * Get the amount of a functional Dinero object in units.
 *
 * @param dineroObject The functional Dinero object to transform.
 *
 * @returns The amount in units.
 */
const functionalToUnit = toUnit({ divide, power });

export default functionalToUnit;
