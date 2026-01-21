import type { HasSubUnitsParams } from '@dinero.js/core';
/**
 * Check whether a Dinero object has minor currency units.
 *
 * @param dineroObject - The Dinero object to check.
 *
 * @returns Whether the Dinero object has minor currency units.
 *
 * @public
 */
export declare function hasSubUnits<TAmount>(...[dineroObject]: HasSubUnitsParams<TAmount>): boolean;
