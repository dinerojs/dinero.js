import type { AddParams } from '@dinero.js/core';
/**
 * Add up the passed Dinero objects.
 *
 * @param augend - The Dinero object to add to.
 * @param addend - The Dinero object to add.
 *
 * @returns A new Dinero object.
 *
 * @public
 */
export declare function add<TAmount>(...[augend, addend]: AddParams<TAmount>): import("@dinero.js/core").Dinero<TAmount>;
