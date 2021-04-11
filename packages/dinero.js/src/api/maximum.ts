import type { MaximumParams } from '@dinero.js/core';
import { maximum as coreMaximum } from '@dinero.js/core';

/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 */
export function maximum<TAmount>(...[dineroObjects]: MaximumParams<TAmount>) {
  const _maximum = coreMaximum({ calculator: dineroObjects[0].calculator });

  return _maximum(dineroObjects);
}
