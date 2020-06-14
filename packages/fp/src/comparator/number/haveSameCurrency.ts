import { Currency } from '@dinero.js/currencies';
import { FunctionalDinero, toSnapshot } from '../../..';

function currencyEqual<TType>(
  subjectCurrency: Currency<TType>,
  comparatorCurrency: Currency<TType>
) {
  return (
    subjectCurrency.code === comparatorCurrency.code &&
    subjectCurrency.base === comparatorCurrency.base &&
    subjectCurrency.exponent === comparatorCurrency.exponent
  );
}

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
    return currencyEqual(subjectCurrency, comparatorCurrency);
  });
}

export default haveSameCurrency;
