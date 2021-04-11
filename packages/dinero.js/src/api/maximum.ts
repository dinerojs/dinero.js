import { createMaximum, Dinero } from '@dinero.js/core';

/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 */
export function maximum<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
) {
  const _maximum = createMaximum(dineroObjects[0].calculator);

  return _maximum(dineroObjects);
}
