import { toUnit as coreToUnit } from '@dinero.js/core';

import type { ToUnitParams } from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject - The Dinero object to transform.
 *
 * @returns The amount in units.
 */
export function toUnit<TAmount>(...[dineroObject]: ToUnitParams<TAmount>) {
  const { calculator } = dineroObject;
  const toUnitFn = coreToUnit({ calculator });

  return toUnitFn(dineroObject);
}
