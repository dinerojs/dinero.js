import type { MaximumParams } from '@dinero.js/core';
/**
 * Get the greatest of the passed Dinero objects.
 *
 * @param dineroObjects - The Dinero objects to maximum.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function maximum<TAmount>(...[dineroObjects]: MaximumParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
