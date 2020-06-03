import {
  FunctionalDinero,
  haveSameAmount,
  haveSameCurrency,
} from "@dinero.js/fp";

/**
 * Check whether the value of a functional Dinero object is equal to another.
 *
 * @param functionalDineros The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects are equal.
 */
function areEqual(...functionalDineros: FunctionalDinero<number>[]) {
  return functionalDineros.every(
    (d) =>
      haveSameAmount(d, functionalDineros[0]) &&
      haveSameCurrency(d, functionalDineros[0])
  );
};

export default areEqual;
