import { hasSubUnits } from '@dinero.js/core';
import { compare, modulo, power, zero } from '@dinero.js/core/calculator';

/**
 * Check whether a functional Dinero object has minor currency units.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object has minor currency units.
 */
const functionalHasSubUnits = hasSubUnits({
  compare,
  modulo,
  power,
  zero,
});

export default functionalHasSubUnits;
