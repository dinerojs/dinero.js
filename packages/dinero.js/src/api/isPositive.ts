import { isPositive as coreIsPositive } from '@dinero.js/core';
import type { IsPositiveParams } from '@dinero.js/core';

/**
 * Check whether a Dinero object is positive.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is positive.
 *
 * @public
 */
export function isPositive<TAmount>(
  ...[dineroObject]: IsPositiveParams<TAmount>
) {
  const { calculator } = dineroObject;
  const isPositiveFn = coreIsPositive(calculator);

  return isPositiveFn(dineroObject);
}
