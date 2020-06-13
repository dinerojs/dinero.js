import { FunctionalDinero, normalizeScale, toSnapshot } from '../../..';

/**
 * Check whether a set of functional Dinero objects have the same amount.
 *
 * @param functionalDineros The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects have the same amount.
 */
function haveSameAmount(
  functionalDineros: ReadonlyArray<FunctionalDinero<number>>
) {
  const [firstDinero, ...otherDineros] = normalizeScale(functionalDineros);
  const { amount: comparatorAmount } = toSnapshot(firstDinero);

  return otherDineros.every((d) => {
    const { amount: subjectAmount } = toSnapshot(d);

    return subjectAmount === comparatorAmount;
  });
}

export default haveSameAmount;
