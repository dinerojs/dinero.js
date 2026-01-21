import type { ConvertParams } from '@dinero.js/core';
/**
 * Convert a Dinero object to another currency.
 *
 * @param dineroObject - The Dinero object to format.
 * @param newCurrency - The currency to convert to.
 * @param rates - The rates to convert with.
 *
 * @returns A converted Dinero object.
 *
 * @public
 */
export declare function convert<TAmount>(...[dineroObject, newCurrency, rates]: ConvertParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
