import { createIsPositive, Dinero } from '@dinero.js/core';

/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the Dinero object is positive.
 */
export function isPositive<TAmount>(dineroObject: Dinero<TAmount>) {
  const _isPositive = createIsPositive(dineroObject.calculator);

  return _isPositive(dineroObject);
}
