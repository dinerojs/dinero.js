import type {
  ToRoundedUnitParams} from '@dinero.js/core';
import {
  toRoundedUnit as coreToRoundedUnit
} from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in rounded units.
 *
 * @param dineroObject The Dinero object to transform.
 * @param digits The number of fraction digits to round to.
 * @param roundingMode The rounding mode to use.
 *
 * @returns The amount in rounded units.
 */
export function toRoundedUnit<TAmount>(
  ...[dineroObject, digits, roundingMode]: ToRoundedUnitParams<TAmount>
) {
  const _toRoundedUnit = coreToRoundedUnit({
    calculator: dineroObject.calculator,
  });

  return _toRoundedUnit(dineroObject, digits, roundingMode);
}
