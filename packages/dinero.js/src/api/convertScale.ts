import type {
  ConvertScaleParams} from '@dinero.js/core';
import {
  convertScale as coreConvertScale
} from '@dinero.js/core';

/**
 * Convert a Dinero object to a new precision.
 *
 * @param dineroObject The Dinero object to convert.
 * @param newScale The new precision.
 * @param roundingMode The rounding mode to use.
 *
 * @returns A new Dinero object.
 */
export function convertScale<TAmount>(
  ...[dineroObject, newScale, roundingMode]: ConvertScaleParams<TAmount>
) {
  const _convertScale = coreConvertScale({
    calculator: dineroObject.calculator,
  });

  return _convertScale(dineroObject, newScale, roundingMode);
}
