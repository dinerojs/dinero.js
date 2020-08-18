import { isPositive } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';

/**
 * Check whether a pure Dinero object is positive.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the pure Dinero object is positive.
 */
const pureIsPositive = isPositive({ zero, compare });

export default pureIsPositive;
