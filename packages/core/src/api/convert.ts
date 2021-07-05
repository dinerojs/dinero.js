import { isScaledAmount, maximum } from '../utils';

import { transformScale } from './transformScale';

import type { Dinero, Rates } from '../types';
import type { Dependencies } from './types';
import type { Currency } from '@dinero.js/currencies';

export type ConvertParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newCurrency: Currency<TAmount>,
  rates: Rates<TAmount>
];

export type ConvertDependencies<TAmount> = Dependencies<
  TAmount,
  | 'add'
  | 'multiply'
  | 'zero'
  | 'power'
  | 'subtract'
  | 'integerDivide'
  | 'compare'
>;

export function convert<TAmount>({ calculator }: ConvertDependencies<TAmount>) {
  const convertScaleFn = transformScale({ calculator });
  const maximumFn = maximum(calculator);

  return function convertFn(
    ...[dineroObject, newCurrency, rates]: ConvertParams<TAmount>
  ) {
    const rate = rates[newCurrency.code];
    const { amount, scale: sourceScale } = dineroObject.toJSON();

    const rateAmount = isScaledAmount(rate) ? rate.amount : rate;
    const rateScale = isScaledAmount(rate)
      ? rate?.scale ?? calculator.zero()
      : calculator.zero();

    const newScale = calculator.add(sourceScale, rateScale);

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
