import { convert as coreConvert } from '@dinero.js/core';
import type { ConvertParams } from '@dinero.js/core';

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
export function convert<TAmount>(
  ...[dineroObject, newCurrency, rates]: ConvertParams<TAmount>
) {
  const { calculator } = dineroObject;
  const converter = coreConvert(calculator);

  return converter(dineroObject, newCurrency, rates);
}
