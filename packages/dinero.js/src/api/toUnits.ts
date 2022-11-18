import { toUnits as coreToUnits } from '@dinero.js/core';
import type { ToUnitsParams } from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns The amount in units.
 *
 * @public
 */
export function toUnits<TAmount, TOutput>(
  ...[dineroObject, transformer]: ToUnitsParams<TAmount, TOutput>
) {
  const { calculator } = dineroObject;
  const toUnitsFn = coreToUnits<TAmount, TOutput>(calculator);

  return toUnitsFn(dineroObject, transformer);
}
