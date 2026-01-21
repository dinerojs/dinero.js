import type { SubtractParams } from '@dinero.js/core';
/**
 * Subtract the passed Dinero objects.
 *
 * @param minuend - The Dinero object to subtract from.
 * @param subtrahend - The Dinero object to subtract.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function subtract<TAmount>(...[minuend, subtrahend]: SubtractParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
