import { normalizeScale as coreNormalizeScale } from '@dinero.js/core';
import type { NormalizeScaleParams } from '@dinero.js/core';

/**
 * Normalize a set of Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects - The Dinero objects to normalize.
 *
 * @returns A new set of Dinero objects.
 *
 * @public
 */
export function normalizeScale<TAmount>(
  ...[dineroObjects]: NormalizeScaleParams<TAmount>
) {
  const { calculator } = dineroObjects[0];
  const normalizeScaleFn = coreNormalizeScale(calculator);

  return normalizeScaleFn(dineroObjects);
}
