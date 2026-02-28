import { transformScale as coreTransformScale } from '../core';
import type { TransformScaleParams } from '../core';

/**
 * Transform a Dinero object to a new scale.
 *
 * @param dineroObject - The Dinero object to transform.
 * @param newScale - The new scale.
 * @param divide - A custom divide function.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export function transformScale<TAmount, TCurrency extends string>(
  ...[dineroObject, newScale, divide]: TransformScaleParams<TAmount, TCurrency>
) {
  const { calculator } = dineroObject;
  const transformScaleFn = coreTransformScale(calculator);

  return transformScaleFn(dineroObject, newScale, divide);
}
