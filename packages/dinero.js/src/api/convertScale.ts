import { createConvertScale, Dinero } from '@dinero.js/core';
import { RoundingMode } from '@dinero.js/calculator';

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
  dineroObject: Dinero<TAmount>,
  newScale: TAmount,
  roundingMode?: RoundingMode<TAmount>
) {
  const _convertScale = createConvertScale(dineroObject.calculator);

  return _convertScale(dineroObject, newScale, roundingMode);
}
