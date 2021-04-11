import { createIsNegative, Dinero } from '@dinero.js/core';

/**
 * Check whether a Dinero object is negative.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the Dinero object is negative.
 */
export function isNegative<TAmount>(dineroObject: Dinero<TAmount>) {
  const _isNegative = createIsNegative(dineroObject.calculator);

  return _isNegative(dineroObject);
}
