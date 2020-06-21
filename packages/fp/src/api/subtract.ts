import { subtract } from '@dinero.js/core';
import { subtract as subtractNumbers } from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Subtract the passed functional Dinero objects.
 *
 * @param minuend The functional Dinero object to subtract from.
 * @param subtrahend The functional Dinero object to subtract.
 *
 * @returns A new functional Dinero object.
 */
const functionalSubtract = subtract(dinero, { subtract: subtractNumbers });

export default functionalSubtract;
