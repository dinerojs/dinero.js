import { hasSubUnits } from '@dinero.js/core';
import { compare, modulo, power, zero } from '@dinero.js/core/calculator';

/**
 * Check whether a pure Dinero object has minor currency units.
 *
 * @param dineroObject The pure Dinero objects to check.
 *
 * @returns Whether the pure Dinero object has minor currency units.
 */
const pureHasSubUnits = hasSubUnits({
  compare,
  modulo,
  power,
  zero,
});

export default pureHasSubUnits;
