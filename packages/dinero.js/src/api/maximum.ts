import { safeMaximum } from '../core';
import type { MaximumParams } from '../core';

/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function maximum<TAmount, TCurrency extends string>(
  ...[dineroObjects]: MaximumParams<TAmount, TCurrency>
) {
  const { calculator } = dineroObjects[0];
  const maximumFn = safeMaximum(calculator);

  return maximumFn(dineroObjects);
}
