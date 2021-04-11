import { createIsZero, Dinero } from '@dinero.js/core';

/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 */
export function isZero<TAmount>(dineroObject: Dinero<TAmount>) {
  const _isZero = createIsZero(dineroObject.calculator);

  return _isZero(dineroObject);
}
