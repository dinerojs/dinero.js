import type { IsZeroParams } from '@dinero.js/core';
/**
 * Check whether the value of a Dinero object is zero.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the value of a Dinero object is zero.
 *
 * @public
 */
export declare function isZero<TAmount>(...[dineroObject]: IsZeroParams<TAmount>): boolean;
