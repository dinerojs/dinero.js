import type { NormalizeScaleParams } from '@dinero.js/core';
/**
 * Normalize a set of Dinero objects to the highest scale of the set.
 *
 * @param dineroObjects - The Dinero objects to normalize.
 *
 * @returns A new set of Dinero objects.
 *
 * @public
 */
export declare function normalizeScale<TAmount>(...[dineroObjects]: NormalizeScaleParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>[];
