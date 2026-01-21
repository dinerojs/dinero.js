import type { IsNegativeParams } from '@dinero.js/core';
/**
 * Check whether a Dinero object is negative.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object is negative.
 *
 * @public
 */
export declare function isNegative<TAmount>(...[dineroObject]: IsNegativeParams<TAmount>): boolean;
