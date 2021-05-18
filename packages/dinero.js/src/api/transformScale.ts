import { transformScale as coreTransformScale } from '@dinero.js/core';

import type { TransformScaleParams } from '@dinero.js/core';

/**
 * Transform a Dinero object to a new precision.
 *
 * @param dineroObject - The Dinero object to transform.
 * @param newScale - The new precision.
 *
 * @returns A new Dinero object.
 */
export function transformScale<TAmount>(
  ...[dineroObject, newScale]: TransformScaleParams<TAmount>
) {
  const { calculator } = dineroObject;
  const transformScaleFn = coreTransformScale({ calculator });

  return transformScaleFn(dineroObject, newScale);
}
