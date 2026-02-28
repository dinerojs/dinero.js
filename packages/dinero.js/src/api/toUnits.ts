import { toUnits as coreToUnits } from '../core';
import type { ToUnitsParams, Dinero, DineroTransformer } from '../core';

export function toUnits<TAmount, TCurrency extends string>(
  dineroObject: Dinero<TAmount, TCurrency>
): readonly TAmount[];

export function toUnits<TAmount, TOutput, TCurrency extends string>(
  dineroObject: Dinero<TAmount, TCurrency>,
  transformer: DineroTransformer<
    TAmount,
    TOutput,
    readonly TAmount[],
    TCurrency
  >
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
export function toUnits<TAmount, TOutput, TCurrency extends string>(
  ...[dineroObject, transformer]: ToUnitsParams<TAmount, TOutput, TCurrency>
) {
  const { calculator } = dineroObject;
  const toUnitsFn = coreToUnits<TAmount, TOutput>(calculator);

  return toUnitsFn(dineroObject, transformer);
}
