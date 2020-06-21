import { hasSubUnits } from '@dinero.js/core';
import { modulo, power, equal, zero } from '@dinero.js/core/calculator/number';

/**
 * Check whether a functional Dinero object has minor currency units.
 *
 * @param dineroObject The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object has minor currency units.
 */
const functionalHasSubUnits = hasSubUnits({
  modulo,
  power,
  equal,
  zero,
});

export default functionalHasSubUnits;
