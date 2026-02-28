import { convert as coreConvert } from '../core';
import type { ConvertParams } from '../core';

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
export function convert<
  TAmount,
  TCurrency extends string,
  TNewCurrency extends string,
>(
  ...[dineroObject, newCurrency, rates]: ConvertParams<
    TAmount,
    TCurrency,
    TNewCurrency
  >
) {
  const { calculator } = dineroObject;
  const converter = coreConvert(calculator);

  return converter(dineroObject, newCurrency, rates);
}
