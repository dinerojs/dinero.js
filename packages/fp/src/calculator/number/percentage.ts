import { percentage as percentageNumbers } from "@dinero.js/core/calculator/number";
import { FunctionalDinero, createFunctionalDinero } from "@dinero.js/fp";

/**
 * Extract a percentage of a functional Dinero object.
 *
 * @param functionalDinero The functional Dinero object to get a percentage from.
 * @param percentage The percentage to extract.
 *
 * @returns A new functional Dinero object.
 */
function percentage(
  functionalDinero: FunctionalDinero<number>,
  percentage: number
) {
  const { amount, currency, scale } = functionalDinero.toJSON();
  const d = createFunctionalDinero({
    amount: percentageNumbers(amount, percentage),
    currency,
    scale,
  });

  return d;
}

export default percentage;
