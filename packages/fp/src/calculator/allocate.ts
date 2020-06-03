import { distribute as distributeNumbers } from "@dinero.js/core/calculator/number";
import { FunctionalDinero, createFunctionalDinero } from "@dinero.js/fp";

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
  ratios: number[]
) {
  const { amount } = functionalDinero.toJSON();
  const distributedAmounts = distributeNumbers(amount, ratios);

  const dineros = distributedAmounts.map((amount) => {
    const { currency, scale } = functionalDinero.toJSON();

    return createFunctionalDinero({
      amount,
      currency,
      scale,
    });
  });

  return dineros;
}

export default percentage;
