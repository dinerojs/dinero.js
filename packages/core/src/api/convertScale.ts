import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type ConvertScaleParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newScale: TAmount,
];

export type ConvertScaleDependencies<TAmount> = Dependencies<
  TAmount,
  'subtract' | 'integerDivide' | 'power'
>;

export function convertScale<TAmount>({
  calculator,
}: ConvertScaleDependencies<TAmount>) {
  return function _convertScale(
    ...[
      dineroObject,
      newScale,
    ]: ConvertScaleParams<TAmount>
  ) {
    const { amount, currency, scale } = dineroObject.toJSON();

    const factor = calculator.power(
      currency.base,
      calculator.subtract(scale, newScale)
    );

    return dineroObject.create({
      amount: calculator.integerDivide(amount, factor),
      currency,
      scale: newScale,
    });
  };
}
