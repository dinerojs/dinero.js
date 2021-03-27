import { convert as coreConvert } from '@dinero.js/core';
import { multiply, halfEven } from '@dinero.js/calculator/number';
import { createFunction } from '../helpers';

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
export const convert = createFunction(coreConvert, {
  multiply,
  round: halfEven,
});
