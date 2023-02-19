import { calculator } from '../calculator';

import { safeSubtract } from '@dinero.js/core';

/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend - The Dinero object to subtract from.
 * @param subtrahend - The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export const subtract = safeSubtract(calculator);
