import { createConvert } from '@dinero.js/core';
import { multiply, halfEven } from '@dinero.js/calculator/number';

/**
 * Convert a Dinero object to another currency.
 *
 * @param dineroObject The Dinero object to convert.
 * @param newCurrency The currency to convert to.
 * @param options.rates The rates to convert with.
 * @param options.roundingMode The rounding mode to use.
 * @param options.preserveScale Whether to preserve the source scale or not.
 *
 * @returns A new Dinero object.
 */
export const convert = createConvert({
  multiply,
  round: halfEven,
});
