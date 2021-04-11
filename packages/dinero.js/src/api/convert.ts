import { createConvert, Dinero, ConvertOptions } from '@dinero.js/core';
import { Currency } from '@dinero.js/currencies';

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
export function convert<TAmount>(
  dineroObject: Dinero<TAmount>,
  newCurrency: Currency<TAmount>,
  options: ConvertOptions<TAmount>
) {
  const _convert = createConvert(dineroObject.calculator);

  return _convert(dineroObject, newCurrency, options);
}
