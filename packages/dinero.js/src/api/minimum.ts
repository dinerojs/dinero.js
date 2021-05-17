import type { MinimumParams } from '@dinero.js/core';
import { safeMinimum } from '@dinero.js/core';

/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 */
export function minimum<TAmount>(...[dineroObjects]: MinimumParams<TAmount>) {
  const minimumFn = safeMinimum({ calculator: dineroObjects[0].calculator });

  return minimumFn(dineroObjects);
}
