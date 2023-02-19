import { calculator } from '../calculator';

import { trimScale as coreTrimScale } from '@dinero.js/core';

/**
 * Trim a Dinero object's scale as much as possible, down to the currency exponent.
 *
 * @param dineroObject - The Dinero object which scale to trim.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export const trimScale = coreTrimScale(calculator);
