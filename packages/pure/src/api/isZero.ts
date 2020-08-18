import { isZero } from '@dinero.js/core';
import { compare, zero } from '@dinero.js/core/calculator';

/**
 * Check whether the value of a pure Dinero object is zero.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the value of a pure Dinero object is zero.
 */
const pureIsZero = isZero({ zero, compare });

export default pureIsZero;
