import type { ToRoundedUnitParams } from '@dinero.js/core';
import { toRoundedUnit as coreToRoundedUnit } from '@dinero.js/core';

/**
 * Get the amount of a Dinero object in rounded units.
 *
 * @param dineroObject - The Dinero object to transform.
 * @param options.digits - The number of fraction digits to round to.
 * @param options.round - The rounding function to use.
 *
 * @returns The amount in rounded units.
 */
export function toRoundedUnit<TAmount>(
  ...[
    dineroObject,
    { digits, round = (value: number) => value },
  ]: ToRoundedUnitParams<TAmount>
) {
  const { calculator } = dineroObject;
  const toRoundedUnitFn = coreToRoundedUnit({ calculator });

  return toRoundedUnitFn(dineroObject, { digits, round });
}
