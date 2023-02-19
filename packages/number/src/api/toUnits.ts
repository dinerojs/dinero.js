import { calculator } from '../calculator';

import { toUnits as coreToUnits } from '@dinero.js/core';
import type { ToUnitsParams, Dinero, Transformer } from '@dinero.js/core';

export function toUnits(dineroObject: Dinero<number>): readonly number[];

export function toUnits<TOutput>(
  dineroObject: Dinero<number>,
  transformer: Transformer<number, TOutput, readonly number[]>
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
export function toUnits<TOutput>(
  ...[dineroObject, transformer]: ToUnitsParams<number, TOutput>
) {
  const toUnitsFn = coreToUnits<number, TOutput>(calculator);

  return toUnitsFn(dineroObject, transformer);
}
