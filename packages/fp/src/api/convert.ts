import { convert } from '@dinero.js/core';
import { multiply } from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Convert a functional Dinero object to another currency.
 *
 * @param dineroObject The functional Dinero object to convert.
 * @param newCurrency The currency to convert to.
 * @param options.rates The rates to convert with.
 * @param options.roundingMode The rounding mode to use.
 *
 * @returns A new functional Dinero object.
 */
const functionalConvert = convert(dinero, { multiply });

export default functionalConvert;
