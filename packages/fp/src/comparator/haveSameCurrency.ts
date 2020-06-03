import { FunctionalDinero } from "@dinero.js/fp";

/**
 * Check whether a set of functional Dinero objects have the same currency.
 *
 * @param functionalDineros The functional Dinero objects to compare.
 *
 * @returns Whether the functional Dinero objects have the same currency.
 */
function haveSameCurrency(...functionalDineros: FunctionalDinero<number>[]) {
  const { currency: comparatorCurrency } = functionalDineros[0].toJSON();

  return functionalDineros.every((d) => {
    const { currency: subjectCurrency } = d.toJSON();

    return subjectCurrency === comparatorCurrency;
  });
};

export default haveSameCurrency;
