import type { IsZeroParams } from '@dinero.js/core';
import { isZero as coreIsZero } from '@dinero.js/core';

/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 */
export function isZero<TAmount>(...[dineroObject]: IsZeroParams<TAmount>) {
  const { calculator } = dineroObject;
  const isZeroFn = coreIsZero({ calculator });

  return isZeroFn(dineroObject);
}
