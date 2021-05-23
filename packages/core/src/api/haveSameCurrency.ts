import type { Dinero } from '../types';
import type { Currency } from '@dinero.js/currencies';

function currencyEqual<TAmount>(
  subject: Currency<TAmount>,
  comparator: Currency<TAmount>
) {
  return (
    subject.code === comparator.code &&
    subject.base === comparator.base &&
    subject.exponent === comparator.exponent
  );
}

export function haveSameCurrency<TAmount>(
  dineroObjects: ReadonlyArray<Dinero<TAmount>>
) {
  const [firstDinero, ...otherDineros] = dineroObjects;
  const { currency: comparator } = firstDinero.toJSON();

  return otherDineros.every((d) => {
    const { currency: subject } = d.toJSON();

    return currencyEqual(subject, comparator);
  });
}
