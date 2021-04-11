import { createPercentage, Dinero } from '@dinero.js/core';

/**
 * Extract a percentage of a Dinero object.
 *
 * @param dineroObject The Dinero object to get a percentage from.
 * @param share The share to extract.
 *
 * @returns A new Dinero object.
 */
export function percentage<TAmount>(
  dineroObject: Dinero<TAmount>,
  share: TAmount
) {
  const _percentage = createPercentage(dineroObject.calculator);

  return _percentage(dineroObject, share);
}
