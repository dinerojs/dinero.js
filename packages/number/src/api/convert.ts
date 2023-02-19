import { calculator } from '../calculator';

import { convert as coreConvert } from '@dinero.js/core';
/**
 * Convert a Dinero object to another currency.
 *
 * @param dineroObject - The Dinero object to format.
 * @param newCurrency - The currency to convert to.
 * @param rates - The rates to convert with.
 *
 * @returns A converted Dinero object.
 *
 * @public
 */
export const convert = coreConvert(calculator);
