import type { Currency } from '@dinero.js/currencies';
import type { Dinero, Rates } from '../types';
import type { Dependencies } from './types';
import { maximum } from '../utils';
import { transformScale } from '.';

export type ConvertParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newCurrency: Currency<TAmount>,
  options: ConvertOptions<TAmount>
];

export type ConvertOptions<TAmount> = {
  readonly rates: Rates<TAmount>;
};

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
    ...[dineroObject, newCurrency, { rates }]: ConvertParams<TAmount>
  ) {
    const { rate, scale: rateScale } = rates[newCurrency.code];
    const { amount, scale: sourceScale } = dineroObject.toJSON();
    const newScale = calculator.add(
      sourceScale,
      rateScale ?? calculator.zero()
    );

    return convertScaleFn(
      dineroObject.create({
        amount: calculator.multiply(amount, rate),
        currency: newCurrency,
        scale: newScale,
      }),
      maximumFn([newScale, newCurrency.exponent])
    );
  };
}
