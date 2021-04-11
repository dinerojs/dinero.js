import { createHasSubUnits, Dinero } from '@dinero.js/core';

/**
 * Check whether a Dinero object has minor currency units.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the Dinero object has minor currency units.
 */
export function hasSubUnits<TAmount>(dineroObject: Dinero<TAmount>) {
  const _hasSubUnits = createHasSubUnits(dineroObject.calculator);

  return _hasSubUnits(dineroObject);
}
