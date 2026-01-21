import type { TrimScaleParams } from '@dinero.js/core';
/**
 * Trim a Dinero object's scale as much as possible, down to the currency exponent.
 *
 * @param dineroObject - The Dinero object which scale to trim.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function trimScale<TAmount>(...[dineroObject]: TrimScaleParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
