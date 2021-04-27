import type { ConvertParams } from '@dinero.js/core';
import { convert as coreConvert } from '@dinero.js/core';

/**
 * Convert a Dinero object to another currency.
 *
 * @param dineroObject The Dinero object to convert.
 * @param newCurrency The currency to convert to.
 * @param options.rates The rates to convert with.
 * @param options.round The rounding function to use.
 * @param options.preserveScale Whether to preserve the source scale or not.
 *
 * @returns A new Dinero object.
 */
export function convert<TAmount>(
  ...[dineroObject, newCurrency, options]: ConvertParams<TAmount>
) {
  const _convert = coreConvert({ calculator: dineroObject.calculator });

  return _convert(dineroObject, newCurrency, options);
}
