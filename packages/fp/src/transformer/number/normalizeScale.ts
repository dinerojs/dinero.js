import { maximum } from '@dinero.js/core/calculator/number';
import { FunctionalDinero } from '../../..';
import { toSnapshot, convertScale } from '.';

/**
 * Normalize a set of functional Dinero objects to the highest scale of the set.
 *
 * @param functionalDineros The functional Dinero objects to normalize.
 *
 * @returns A new set of functional Dinero objects.
 */
function normalizeScale(
  functionalDineros: ReadonlyArray<FunctionalDinero<number>>
) {
  const highestScale = functionalDineros.reduce((acc, curr) => {
    const { scale } = toSnapshot(curr);

    return maximum([acc, scale]);
  }, 0);

  return functionalDineros.map((d) => {
    const { scale } = toSnapshot(d);

    return scale !== highestScale ? convertScale(d, highestScale) : d;
  });
}

export default normalizeScale;
