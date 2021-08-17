import type { Currency } from '@dinero.js/currencies';

import type { Calculator, Dinero, Rates } from '../types';
import { getAmountAndScale, maximum } from '../utils';

import { transformScale } from './transformScale';

export type ConvertParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newCurrency: Currency<TAmount>,
  rates: Rates<TAmount>
];

export function convert<TAmount>(calculator: Calculator<TAmount>) {
  const convertScaleFn = transformScale(calculator);
  const maximumFn = maximum(calculator);
  const zero = calculator.zero();

  return function convertFn(
    ...[dineroObject, newCurrency, rates]: ConvertParams<TAmount>
  ) {
    const rate = rates[newCurrency.code];
    const { amount, scale } = dineroObject.toJSON();
    const { amount: rateAmount, scale: rateScale } = getAmountAndScale(
      rate,
      zero
    );

    const newScale = calculator.add(scale, rateScale);

    return convertScaleFn(
      dineroObject.create({
        amount: calculator.multiply(amount, rateAmount),
        currency: newCurrency,
        scale: newScale,
      }),
      maximumFn([newScale, newCurrency.exponent])
    );
  };
}
