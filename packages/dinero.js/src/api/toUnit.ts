import { createToUnit, Dinero } from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject The Dinero object to transform.
 *
 * @returns The amount in units.
 */
export function toUnit<TAmount>(dineroObject: Dinero<TAmount>) {
  const _toUnit = createToUnit(dineroObject.calculator);

  return _toUnit(dineroObject);
}
