import { createHaveSameAmount, Dinero } from '@dinero.js/core';

/**
 * Check whether a set of Dinero objects have the same amount.
 *
 * @param dineroObjects The Dinero objects to compare.
 *
 * @returns Whether the Dinero objects have the same amount.
 */
export function haveSameAmount<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
) {
  const _haveSameAmount = createHaveSameAmount(dineroObjects[0].calculator);

  return _haveSameAmount(dineroObjects);
}
