import type { Dinero } from '../types';
import type { Dependencies } from './types';

export type TransformScaleParams<TAmount> = readonly [
  dineroObject: Dinero<TAmount>,
  newScale: TAmount
];

export type TransformScaleDependencies<TAmount> = Dependencies<
  TAmount,
  'subtract' | 'integerDivide' | 'power'
>;

export function transformScale<TAmount>({
  calculator,
}: TransformScaleDependencies<TAmount>) {
  return function transformScaleFn(
    ...[dineroObject, newScale]: TransformScaleParams<TAmount>
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
