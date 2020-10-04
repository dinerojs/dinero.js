import { hasSubUnits as coreHasSubUnits } from '@dinero.js/core';
import { compare, modulo, power, zero } from '@dinero.js/core/calculator';
import { buildMethod } from '../helpers';

/**
 * Check whether a pure Dinero object has minor currency units.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the pure Dinero object has minor currency units.
 */
export const hasSubUnits = buildMethod(coreHasSubUnits, {
  compare,
  modulo,
  power,
  zero,
});
