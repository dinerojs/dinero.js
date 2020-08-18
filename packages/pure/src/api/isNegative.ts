import { isNegative } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';

/**
 * Check whether a pure Dinero object is negative.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the pure Dinero object is negative.
 */
const pureIsNegative = isNegative({ zero, compare });

export default pureIsNegative;
