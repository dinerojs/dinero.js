import type { ToUnitParams } from '@dinero.js/core';
import { toUnit as coreToUnit } from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject The Dinero object to transform.
 *
 * @returns The amount in units.
 */
export function toUnit<TAmount>(...[dineroObject]: ToUnitParams<TAmount>) {
  const _toUnit = coreToUnit({ calculator: dineroObject.calculator });

  return _toUnit(dineroObject);
}
