import { FunctionalDinero, toSnapshot } from '../../..';

/**
 * Check whether a set of functional Dinero objects have the same currency.
 *
 * @param functionalDineros The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects have the same currency.
 */
function haveSameCurrency(
  functionalDineros: ReadonlyArray<FunctionalDinero<number>>
) {
  const [firstDinero, ...otherDineros] = functionalDineros;
  const { currency: comparatorCurrency } = toSnapshot(firstDinero);

  return otherDineros.every((d) => {
    const { currency: subjectCurrency } = toSnapshot(d);

    return subjectCurrency === comparatorCurrency;
  });
}

export default haveSameCurrency;
