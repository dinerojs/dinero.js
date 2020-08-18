import { toUnit } from '@dinero.js/core';
import { divide, power } from '@dinero.js/core/calculator';

/**
 * Get the amount of a pure Dinero object in units.
 *
 * @param dineroObject The pure Dinero object to transform.
 *
 * @returns The amount in units.
 */
const pureToUnit = toUnit({ divide, power });

export default pureToUnit;
