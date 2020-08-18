import { subtract } from '@dinero.js/core';
import { subtract as subtractNumbers } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Subtract the passed pure Dinero objects.
 *
 * @param minuend The pure Dinero object to subtract from.
 * @param subtrahend The pure Dinero object to subtract.
 *
 * @returns A new pure Dinero object.
 */
const pureSubtract = subtract(dinero, { subtract: subtractNumbers });

export default pureSubtract;
