import { FunctionalDinero, haveSameAmount, haveSameCurrency } from '../../..';

/**
 * Check whether the value of a functional Dinero object is equal to another.
 *
 * @param functionalDineros The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects are equal.
 */
function areEqual(functionalDineros: ReadonlyArray<FunctionalDinero<number>>) {
  const [firstDinero, ...otherDineros] = functionalDineros;

  return otherDineros.every(
    (d) =>
      haveSameAmount([d, firstDinero]) && haveSameCurrency([d, firstDinero])
  );
}

export default areEqual;
