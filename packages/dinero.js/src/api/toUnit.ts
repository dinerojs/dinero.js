import { toUnit as coreToUnit } from '@dinero.js/core';
import type { ToUnitParams } from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject - The Dinero object to transform.
 * @param options.digits - The number of fraction digits to round to.
 * @param options.round - The rounding function to use.
 *
 * @returns The amount in units.
 */
export function toUnit<TAmount>(
  ...[dineroObject, options]: ToUnitParams<TAmount>
) {
  const { calculator } = dineroObject;
  const toUnitFn = coreToUnit(calculator);

  return toUnitFn(dineroObject, options);
}
