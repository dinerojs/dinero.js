import type {
  IsPositiveParams} from '@dinero.js/core';
import {
  isPositive as coreIsPositive
} from '@dinero.js/core';

/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the Dinero object is positive.
 */
export function isPositive<TAmount>(
  ...[dineroObject]: IsPositiveParams<TAmount>
) {
  const _isPositive = coreIsPositive({ calculator: dineroObject.calculator });

  return _isPositive(dineroObject);
}
