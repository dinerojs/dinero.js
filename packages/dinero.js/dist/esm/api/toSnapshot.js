import { toSnapshot as coreToSnapshot } from '@dinero.js/core';

/**
 * Get a snapshot of a Dinero object.
 *
 * @param dineroObject - The Dinero object to format.
 * @param transformer - A transformer function.
 *
 * @returns A snapshot of the object.
 *
 * @public
 */
export var toSnapshot = coreToSnapshot;