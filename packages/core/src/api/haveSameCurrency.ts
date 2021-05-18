import type { Dinero } from '../types';
import type { Currency } from '@dinero.js/currencies';

function currencyEqual<TAmount>(
  subjectCurrency: Currency<TAmount>,
  comparatorCurrency: Currency<TAmount>
) {
  return (
    subjectCurrency.code === comparatorCurrency.code &&
    subjectCurrency.base === comparatorCurrency.base &&
    subjectCurrency.exponent === comparatorCurrency.exponent
  );
}

export function haveSameCurrency<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
) {
  const [firstDinero, ...otherDineros] = dineroObjects;
  const { currency: comparatorCurrency } = firstDinero.toJSON();

  return otherDineros.every((d) => {
    const { currency: subjectCurrency } = d.toJSON();

    return currencyEqual(subjectCurrency, comparatorCurrency);
  });
}
