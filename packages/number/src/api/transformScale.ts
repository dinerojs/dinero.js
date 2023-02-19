import { calculator } from '../calculator';

import { transformScale as coreTransformScale } from '@dinero.js/core';

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
export const transformScale = coreTransformScale(calculator);
