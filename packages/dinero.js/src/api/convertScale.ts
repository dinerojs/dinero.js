import type { ConvertScaleParams } from '@dinero.js/core';
import { convertScale as coreConvertScale } from '@dinero.js/core';

/**
 * Convert a Dinero object to a new precision.
 *
 * @param dineroObject The Dinero object to convert.
 * @param newScale The new precision.
 *
 * @returns A new Dinero object.
 */
export function convertScale<TAmount>(
  ...[dineroObject, newScale]: ConvertScaleParams<TAmount>
) {
  const { calculator } = dineroObject;
  const convertScaleFn = coreConvertScale({ calculator });

  return convertScaleFn(dineroObject, newScale);
}
