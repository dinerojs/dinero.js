import { distribute as distributeNumbers } from '@dinero.js/core/calculator/number';
import dinero, { FunctionalDinero } from '@dinero.js/fp';

/**
 * Distributes the amount of a functional Dinero object across a list of ratios.
 *
 * @param functionalDinero The functional Dinero object to allocate from.
 * @param ratios The ratios to allocate the amount to.
 *
 * @returns A new functional Dinero object.
 */
function percentage(
  functionalDinero: FunctionalDinero<number>,
  ratios: readonly number[]
) {
  const { amount: dineroAmount } = functionalDinero.toJSON();
  const distributedAmounts = distributeNumbers(dineroAmount, ratios);

  return distributedAmounts.map((amount) => {
    const { currency, scale } = functionalDinero.toJSON();

    return dinero({
      amount,
      currency,
      scale,
    });
  });
}

export default percentage;
