import { hasSubUnits as coreHasSubUnits } from '@dinero.js/core';
import type { HasSubUnitsParams } from '@dinero.js/core';

/**
 * Check whether a Dinero object has minor currency units.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object has minor currency units.
 *
 * @public
 */
export function hasSubUnits<TAmount>(
  ...[dineroObject]: HasSubUnitsParams<TAmount>
) {
  const { calculator } = dineroObject;
  const hasSubUnitsFn = coreHasSubUnits(calculator);

  return hasSubUnitsFn(dineroObject);
}
