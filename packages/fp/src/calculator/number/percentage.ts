import { percentage as percentageNumbers } from '@dinero.js/core/calculator/number';
import dinero, { FunctionalDinero, toSnapshot } from '../../..';

/**
 * Extract a percentage of a functional Dinero object.
 *
 * @param functionalDinero The functional Dinero object to get a percentage from.
 * @param share The share to extract.
 *
 * @returns A new functional Dinero object.
 */
function percentage(functionalDinero: FunctionalDinero<number>, share: number) {
  const { amount: rawAmount, currency, scale } = toSnapshot(functionalDinero);
  const amount = percentageNumbers(rawAmount, share);

  return dinero({
    amount,
    currency,
    scale,
  });
}

export default percentage;
