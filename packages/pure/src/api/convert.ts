import { convert } from '@dinero.js/core';
import { multiply, halfEven } from '@dinero.js/core/calculator';
import dinero from '../dinero';

/**
 * Convert a pure Dinero object to another currency.
 *
 * @param dineroObject The pure Dinero object to convert.
 * @param newCurrency The currency to convert to.
 * @param options.rates The rates to convert with.
 * @param options.roundingMode The rounding mode to use.
 * @param options.preserveScale Whether to preserve the source scale or not.
 *
 * @returns A new pure Dinero object.
 */
const pureConvert = convert(dinero, { multiply, round: halfEven });

export default pureConvert;
