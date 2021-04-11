import { createMinimum, Dinero } from '@dinero.js/core';

/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 */
export function minimum<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
) {
  const _minimum = createMinimum(dineroObjects[0].calculator);

  return _minimum(dineroObjects);
}
