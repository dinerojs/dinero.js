import type {
  PercentageParams} from '@dinero.js/core';
import {
  percentage as corePercentage
} from '@dinero.js/core';

/**
 * Extract a percentage of a Dinero object.
 *
 * @param dineroObject The Dinero object to get a percentage from.
 * @param share The share to extract.
 *
 * @returns A new Dinero object.
 */
export function percentage<TAmount>(
  ...[dineroObject, share]: PercentageParams<TAmount>
) {
  const _percentage = corePercentage({ calculator: dineroObject.calculator });

  return _percentage(dineroObject, share);
}
