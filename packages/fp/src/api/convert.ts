import { convert } from '@dinero.js/core';
import { multiply, halfEven } from '@dinero.js/core/calculator/number';
import dinero from '../dinero';

/**
 * Convert a functional Dinero object to another currency.
 *
 * @param dineroObject The functional Dinero object to convert.
 * @param newCurrency The currency to convert to.
 * @param options.rates The rates to convert with.
 * @param options.roundingMode The rounding mode to use.
 * @param options.preserveScale Whether to preserve the source scale or not.
 *
 * @returns A new functional Dinero object.
 */
const functionalConvert = convert(dinero, { multiply, round: halfEven });

export default functionalConvert;
