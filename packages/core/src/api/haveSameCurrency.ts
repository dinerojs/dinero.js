import { Currency } from '@dinero.js/currencies';
import { Dinero } from '../types';

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

export function haveSameCurrency<TAmount, TDinero extends Dinero<TAmount>>(
  dineroObjects: readonly TDinero[]
) {
  const [firstDinero, ...otherDineros] = dineroObjects;
  const { currency: comparatorCurrency } = firstDinero.toJSON();

  return otherDineros.every((d) => {
    const { currency: subjectCurrency } = d.toJSON();

    return currencyEqual(subjectCurrency, comparatorCurrency);
  });
}
