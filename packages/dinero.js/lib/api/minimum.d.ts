import type { MinimumParams } from '@dinero.js/core';
/**
 * Get the lowest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to minimum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function minimum<TAmount>(...[dineroObjects]: MinimumParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
