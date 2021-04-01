import { createHasSubUnits } from '@dinero.js/core';
import { compare, modulo, power, zero } from '@dinero.js/calculator/number';

/**
 * Check whether a Dinero object has minor currency units.
 *
 * @param dineroObject The Dinero objects to check.
 *
 * @returns Whether the Dinero object has minor currency units.
 */
export const hasSubUnits = createHasSubUnits({
  compare,
  modulo,
  power,
  zero,
});
