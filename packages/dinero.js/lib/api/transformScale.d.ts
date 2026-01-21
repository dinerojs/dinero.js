import type { TransformScaleParams } from '@dinero.js/core';
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
export declare function transformScale<TAmount>(...[dineroObject, newScale, divide]: TransformScaleParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
