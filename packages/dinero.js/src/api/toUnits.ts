import { toUnits as coreToUnits } from '@dinero.js/core';
import type { ToUnitsParams, Dinero, Transformer } from '@dinero.js/core';

export function toUnits<TAmount>(
  dineroObject: Dinero<TAmount>
): readonly TAmount[];

export function toUnits<TAmount, TOutput>(
  dineroObject: Dinero<TAmount>,
  transformer: Transformer<TAmount, TOutput, readonly TAmount[]>
): TOutput;

/**
 * Get the amount of a Dinero object in units.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns The amount in units.
 *
 * @public
 */
export function toUnits<TAmount, TOutput>(
  ...[dineroObject, transformer]: ToUnitsParams<TAmount, TOutput>
) {
  const { calculator } = dineroObject;
  const toUnitsFn = coreToUnits<TAmount, TOutput>(calculator);

  return toUnitsFn(dineroObject, transformer);
}
