import { createNormalizeScale, Dinero } from '@dinero.js/core';

/**
 * Normalize a set of Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects The Dinero objects to normalize.
 *
 * @returns A new set of Dinero objects.
 */
export function normalizeScale<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
) {
  const _normalizeScale = createNormalizeScale(dineroObjects[0].calculator);

  return _normalizeScale(dineroObjects);
}
