import { modulo, power } from "@dinero.js/core/calculator/number";
import { FunctionalDinero } from "@dinero.js/fp";

/**
 * Check whether a functional Dinero object has minor currency units.
 *
 * @param functionalDinero The functional Dinero objects to check.
 *
 * @returns Whether the functional Dinero object has minor currency units.
 */
function hasSubUnits(functionalDinero: FunctionalDinero<number>) {
  const { amount, currency, scale } = functionalDinero.toJSON();

  return modulo(amount, power(currency.base, scale)) !== 0;
}

export default hasSubUnits;
