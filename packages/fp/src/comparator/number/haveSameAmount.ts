import { FunctionalDinero, normalizeScale } from '@dinero.js/fp';

/**
 * Check whether a set of functional Dinero objects have the same amount.
 *
 * @param functionalDineros The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects have the same amount.
 */
function haveSameAmount(
  ...functionalDineros: ReadonlyArray<FunctionalDinero<number>>
) {
  const comparators = normalizeScale(functionalDineros);
  const { amount: comparatorAmount } = comparators[0].toJSON();

  return comparators.every((d) => {
    const { amount: subjectAmount } = d.toJSON();

    return subjectAmount === comparatorAmount;
  });
}

export default haveSameAmount;
