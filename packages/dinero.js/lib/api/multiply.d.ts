import type { MultiplyParams } from '@dinero.js/core';
/**
 * Multiply the passed Dinero object.
 *
 * @param multiplicand - The Dinero object to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function multiply<TAmount>(...[multiplicand, multiplier]: MultiplyParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
