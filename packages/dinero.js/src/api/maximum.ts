import { safeMaximum } from '@dinero.js/core';
import type { Dinero, MaximumParams } from '@dinero.js/core';

/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function maximum<TAmount>(
  ...[dineroObjects]: MaximumParams<TAmount>
): Dinero<TAmount> {
  const { calculator } = dineroObjects[0];
  const maximumFn = safeMaximum(calculator);

  return maximumFn(dineroObjects);
}
